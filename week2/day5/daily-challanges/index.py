from flask import Flask, jsonify, request, render_template, redirect, url_for, session, flash
from database.index import connect_to_db
from psycopg2.extras import RealDictCursor
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv
from werkzeug.utils import secure_filename


load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')


@app.route('/', methods=['GET'])
def index():
    conn = connect_to_db()
    if conn is None:
        flash("Database connection failed.", "danger")
        return render_template('index.html', vehicles=[])
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM Vehicles")
    vehicles = cursor.fetchall()
    conn.close()
    return render_template('index.html', vehicles=vehicles)


@app.route('/vehicles/<int:vehicle_id>', methods=['GET'])
def vehicle_details(vehicle_id):
    conn = connect_to_db()
    if conn is None:
        flash("Database connection failed.", "danger")
        return redirect(url_for('index'))
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM Vehicles WHERE id = %s", (vehicle_id,))
    vehicle = cursor.fetchone()
    conn.close()
    if vehicle is None:
        flash("Vehicle not found.", "warning")
        return redirect(url_for('index'))
    return render_template('vehicle_details.html', vehicle=vehicle)


@app.route('/search')
def search():
    conn = connect_to_db()
    if conn is None:
        flash("Database connection failed.", "danger")
        return redirect(url_for('index'))
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    query = request.args.get('q', '').strip()
    vehicles = []
    if query:
        cursor.execute(
            "SELECT * FROM Vehicles WHERE name ILIKE %s OR model ILIKE %s",
            (f'%{query}%', f'%{query}%')
        )
        vehicles = cursor.fetchall()
    conn.close()
    return render_template('index.html', vehicles=vehicles, query=query)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user_id' in session:
        if session.get('user_role') == 'salesperson':
            return redirect(url_for('dashboard'))
        else:
            return redirect(url_for('index'))
    email = ''
    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '').strip()
        if not email or not password:
            flash("Please enter both email and password.", "warning")
            return render_template('login.html', email=email)
        conn = connect_to_db()
        if conn is None:
            flash("Database connection failed.", "danger")
            return render_template('login.html', email=email)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT * FROM salespeople WHERE email = %s", (email,))
        user = cursor.fetchone()
        role = 'salesperson'
        if not user:
            cursor.execute("SELECT * FROM customers WHERE email = %s", (email,))
            user = cursor.fetchone()
            role = 'customer'
        conn.close()
        if user and check_password_hash(user['password'], password):
            session['user_id'] = user['id']
            session['user_name'] = user['name']
            session['user_role'] = role
            flash(f"Welcome {user['name']}!", "success")
            if role == 'salesperson':
                return redirect(url_for('dashboard'))
            else:
                return redirect(url_for('index'))
        else:
            flash("Invalid email or password.", "danger")
    return render_template('login.html', email=email)


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        role = request.form.get('role', 'customer')

        hashed_password = generate_password_hash(password)
        conn = connect_to_db()
        if conn is None:
            flash("Database connection failed.", "danger")
            return render_template('signup.html')
        cursor = conn.cursor()
        try:
            if role == 'salesperson':
                cursor.execute(
                    "INSERT INTO salespeople (name, email, password) VALUES (%s, %s, %s)",
                    (name, email, hashed_password)
                )
            else:
                cursor.execute(
                    "INSERT INTO customers (name, email, password) VALUES (%s, %s, %s)",
                    (name, email, hashed_password)
                )
            conn.commit()
            flash("Signup successful! You can now login.", "success")
            return redirect(url_for('login'))
        except Exception as e:
            conn.rollback()
            if 'unique constraint' in str(e).lower() or 'duplicate key' in str(e).lower():
                flash("This email is already registered.", "warning")
            else:
                flash("Signup failed. Please try again.", "danger")
        finally:
            conn.close()
    return render_template('signup.html')


@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM Vehicles")
    vehicles = cursor.fetchall()
    conn.close()
    return render_template('dashboard.html', user_name=session.get('user_name'), user_role=session.get('user_role'), vehicles=vehicles)


UPLOAD_FOLDER = "static/images"

@app.route('/vehicles/create', methods=['GET', 'POST'])
def create_vehicle():
    if 'user_id' not in session or session.get('user_role') != 'salesperson':
        flash("You must be logged in as salesperson.", "warning")
        return redirect(url_for('login'))

    if request.method == 'POST':
        name = request.form['name']
        model = request.form['model']
        price = request.form['price']
        year = request.form['year']
        status = request.form['status']

        # ✅ ناخدو الملف من الفورم
        file = request.files['image']
        image_path = None

        if file and file.filename != "":
            filename = secure_filename(file.filename) 
            image_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(image_path) 

            image_path = "/" + image_path  

        conn = connect_to_db()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO Vehicles (name, model, price, year, status, image) VALUES (%s, %s, %s, %s, %s, %s)",
                (name, model, price, year, status, image_path)
            )
            conn.commit()
            flash("Vehicle created successfully.", "success")
        except Exception as e:
            conn.rollback()
            flash("Failed to create vehicle: " + str(e), "danger")
        finally:
            conn.close()

        return redirect(url_for('dashboard'))

    return render_template('vehicle_form.html', action="Create")


@app.route('/vehicles/<int:vehicle_id>/edit', methods=['GET', 'POST'])
def edit_vehicle(vehicle_id):
    if 'user_id' not in session or session.get('user_role') != 'salesperson':
        flash("You must be logged in as salesperson.", "warning")
        return redirect(url_for('login'))

    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM Vehicles WHERE id = %s", (vehicle_id,))
    vehicle = cursor.fetchone()

    if not vehicle:
        conn.close()
        flash("Vehicle not found.", "warning")
        return redirect(url_for('dashboard'))

    if request.method == 'POST':
        name = request.form['name']
        model = request.form['model']
        price = request.form['price']
        year = request.form['year']
        status = request.form['status']

        # التعامل مع الصورة الجديدة
        image_file = request.files.get('image')
        image_path = vehicle['image']  # نخلي path القديمة إذا ما تحركتش

        if image_file and image_file.filename != '':
            from werkzeug.utils import secure_filename
            import os
            UPLOAD_FOLDER = 'static/images'
            filename = secure_filename(image_file.filename)
            image_path = os.path.join(UPLOAD_FOLDER, filename)
            image_file.save(image_path)
            image_path = '/' + image_path  # باش يخزن فـ DB

        try:
            cursor2 = conn.cursor()
            cursor2.execute(
                "UPDATE Vehicles SET name=%s, model=%s, price=%s, year=%s, status=%s, image=%s WHERE id=%s",
                (name, model, price, year, status, image_path, vehicle_id)
            )
            conn.commit()
            flash("Vehicle updated successfully.", "success")
        except Exception as e:
            conn.rollback()
            flash(f"Failed to update vehicle. Error: {e}", "danger")
        finally:
            conn.close()
        return redirect(url_for('dashboard'))

    conn.close()
    return render_template('vehicle_form.html', action="Edit", vehicle=vehicle)


@app.route('/vehicles/<int:vehicle_id>/delete', methods=['POST'])
def delete_vehicle(vehicle_id):
    if 'user_id' not in session or session.get('user_role') != 'salesperson':
        flash("You must be logged in as salesperson.", "warning")
        return redirect(url_for('login'))
    conn = connect_to_db()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM Vehicles WHERE id = %s", (vehicle_id,))
        conn.commit()
        flash("Vehicle deleted successfully.", "success")
    except Exception:
        conn.rollback()
        flash("Failed to delete vehicle.", "danger")
    finally:
        conn.close()
    return redirect(url_for('dashboard'))


@app.route('/sales/create', methods=['GET', 'POST'])
def create_salle():
    if 'user_id' not in session:
        flash("You must be logged in.", "warning")
        return redirect(url_for('login'))
    if request.method == 'POST':
        name = request.form['name']
        location = request.form['location']
        salesperson_id = session['user_id']
        conn = connect_to_db()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO sales (name, location, salesperson_id) VALUES (%s, %s, %s)",
                (name, location, salesperson_id)
            )
            conn.commit()
            flash("Salle created successfully.", "success")
            return redirect(url_for('dashboard'))
        except Exception:
            conn.rollback()
            flash("Failed to create salle.", "danger")
        finally:
            conn.close()
    return render_template('salle_form.html')


@app.route('/logout')
def logout():
    session.clear()
    flash("Logged out successfully.", "success")
    return redirect(url_for('login'))


@app.route('/dashboard/stats')
def dashboard_stats():
    if 'user_id' not in session or session.get('user_role') != 'salesperson':
        flash("You must be logged in as salesperson.", "warning")
        return redirect(url_for('login'))
    
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    # Example: Total vehicles by status
    cursor.execute("SELECT status, COUNT(*) as count FROM Vehicles GROUP BY status")
    vehicle_status = cursor.fetchall()

    # Example: Total sales by year
    cursor.execute("SELECT year, COUNT(*) as count FROM Vehicles GROUP BY year ORDER BY year")
    vehicle_years = cursor.fetchall()

    conn.close()

    return jsonify({
        "vehicle_status": vehicle_status,
        "vehicle_years": vehicle_years
    })


if __name__ == '__main__':
    app.run(debug=True, port=5002)
