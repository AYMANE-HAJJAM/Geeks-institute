from flask import Flask, jsonify, request, render_template, redirect, url_for, session, flash
from database.index import connect_to_db
from psycopg2.extras import RealDictCursor
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')

UPLOAD_FOLDER = "static/images"


# ===========================
# Home / Vehicle Listing
# ===========================
@app.route('/', methods=['GET'])
def index():
    """Display all vehicles on the homepage"""
    conn = connect_to_db()
    if conn is None:
        flash("Database connection failed.", "danger")
        return render_template('index.html', vehicles=[])

    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM Vehicles")
    vehicles = cursor.fetchall()
    conn.close()
    return render_template('index.html', vehicles=vehicles)


# ===========================
# Vehicle Details Page
# ===========================
@app.route('/vehicles/<int:vehicle_id>', methods=['GET'])
def vehicle_details(vehicle_id):
    """Show details of a single vehicle"""
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


# ===========================
# Search Vehicles
# ===========================
@app.route('/search')
def search():
    """Search vehicles by name or model"""
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


# ===========================
# Login
# ===========================
@app.route('/login', methods=['GET', 'POST'])
def login():
    """User login for customer or salesperson"""
    if 'user_id' in session:
        # Redirect based on role
        if session.get('user_role') == 'salesperson':
            return redirect(url_for('dashboard'))
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

        # Check salespeople first
        cursor.execute("SELECT * FROM salespeople WHERE email = %s", (email,))
        user = cursor.fetchone()
        role = 'salesperson'

        # If not salesperson, check customers
        if not user:
            cursor.execute("SELECT * FROM customers WHERE email = %s", (email,))
            user = cursor.fetchone()
            role = 'customer'

        conn.close()

        # Verify password
        if user and check_password_hash(user['password'], password):
            session['user_id'] = user['id']
            session['user_name'] = user['name']
            session['user_role'] = role
            if role == 'customer':
                session['customer_id'] = user['id']

            flash(f"Welcome {user['name']}!", "success")

            if role == 'salesperson':
                return redirect(url_for('dashboard'))
            return redirect(url_for('index'))
        else:
            flash("Invalid email or password.", "danger")

    return render_template('login.html', email=email)


# ===========================
# Signup
# ===========================
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    """User signup for customer or salesperson"""
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


# ===========================
# Create Vehicle (Salesperson)
# ===========================
@app.route('/vehicles/create', methods=['GET', 'POST'])
def create_vehicle():
    """Salesperson can create a new vehicle"""
    if 'user_id' not in session or session.get('user_role') != 'salesperson':
        flash("You must be logged in as salesperson.", "warning")
        return redirect(url_for('login'))

    if request.method == 'POST':
        name = request.form['name']
        model = request.form['model']
        price = request.form['price']
        year = request.form['year']
        status = request.form['status']
        file = request.files['image']
        image_path = None

        # Save uploaded image
        if file and file.filename != "":
            filename = secure_filename(file.filename)
            image_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(image_path)
            image_path = "/" + image_path

        salesperson_id = session['user_id']

        conn = connect_to_db()
        cursor = conn.cursor()
        try:
            cursor.execute(
                """
                INSERT INTO Vehicles (name, model, price, year, status, image, salesperson_id)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """,
                (name, model, price, year, status, image_path, salesperson_id)
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


# ===========================
# Edit Vehicle
# ===========================
@app.route('/vehicles/<int:vehicle_id>/edit', methods=['GET', 'POST'])
def edit_vehicle(vehicle_id):
    """Edit vehicle (only by salesperson who owns it)"""
    if 'user_id' not in session or session.get('user_role') != 'salesperson':
        flash("You must be logged in as salesperson.", "warning")
        return redirect(url_for('login'))

    salesperson_id = session['user_id']
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute(
        "SELECT * FROM Vehicles WHERE id = %s AND salesperson_id = %s",
        (vehicle_id, salesperson_id)
    )
    vehicle = cursor.fetchone()

    if not vehicle:
        conn.close()
        flash("Vehicle not found or you don't have permission to edit it.", "warning")
        return redirect(url_for('dashboard'))

    if request.method == 'POST':
        name = request.form['name']
        model = request.form['model']
        price = request.form['price']
        year = request.form['year']
        status = request.form['status']
        image_file = request.files.get('image')
        image_path = vehicle['image']

        if image_file and image_file.filename != '':
            filename = secure_filename(image_file.filename)
            image_path = os.path.join(UPLOAD_FOLDER, filename)
            image_file.save(image_path)
            image_path = '/' + image_path

        try:
            cursor.execute(
                """
                UPDATE Vehicles SET name=%s, model=%s, price=%s, year=%s, status=%s, image=%s
                WHERE id=%s AND salesperson_id=%s
                """,
                (name, model, price, year, status, image_path, vehicle_id, salesperson_id)
            )
            conn.commit()
            flash("Vehicle updated successfully.", "success")
        except Exception as e:
            conn.rollback()
            flash(f"Failed to update vehicle. Error: {e}", "danger")
        finally:
            conn.close()

        return redirect(url_for('dashboard'))

    return render_template('vehicle_form.html', action="Edit", vehicle=vehicle)


# ===========================
# Delete Vehicle
# ===========================
@app.route('/vehicles/<int:vehicle_id>/delete', methods=['POST'])
def delete_vehicle(vehicle_id):
    """Delete a vehicle (only by salesperson who owns it)"""
    if 'user_id' not in session or session.get('user_role') != 'salesperson':
        flash("You must be logged in as salesperson.", "warning")
        return redirect(url_for('login'))

    salesperson_id = session['user_id']
    conn = connect_to_db()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "DELETE FROM Vehicles WHERE id = %s AND salesperson_id = %s",
            (vehicle_id, salesperson_id)
        )
        if cursor.rowcount == 0:
            flash("Vehicle not found or you don't have permission to delete it.", "warning")
        else:
            conn.commit()
            flash("Vehicle deleted successfully.", "success")
    except Exception as e:
        conn.rollback()
        flash(f"Failed to delete vehicle. Error: {e}", "danger")
    finally:
        conn.close()

    return redirect(url_for('dashboard'))


# ===========================
# Create Sale
# ===========================
@app.route('/create_sale/<int:vehicle_id>', methods=['GET', 'POST'])
def create_sale(vehicle_id):
    """Handle vehicle sale process"""
    if 'customer_id' not in session:
        flash("You need to login as a customer to make a sale", "error")
        return redirect(url_for('login'))

    # Get vehicle information
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM Vehicles WHERE id = %s AND status = 'Available'", (vehicle_id,))
    vehicle = cursor.fetchone()
    
    if not vehicle:
        flash("Vehicle not found or not available.", "error")
        return redirect(url_for('index'))

    if request.method == 'GET':
        conn.close()
        return render_template('salle_form.html', vehicle=vehicle)

    # Handle POST request for creating sale
    customer_id = session['customer_id']

    try:
        # Insert sale only if vehicle is available
        cursor.execute("""
            INSERT INTO sales (vehicle_id, customer_id, salesperson_id, price)
            SELECT v.id, %s, v.salesperson_id, v.price 
            FROM vehicles v WHERE v.id = %s AND v.status = 'Available'
        """, (customer_id, vehicle_id))

        # Mark vehicle as sold
        cursor.execute("UPDATE vehicles SET status = 'Sold' WHERE id = %s", (vehicle_id,))
        conn.commit()
        flash("Sale completed successfully!", "success")
        return redirect(url_for('index'))
    except Exception as e:
        conn.rollback()
        flash("Failed to complete sale. Please try again.", "error")
        return render_template('salle_form.html', vehicle=vehicle)
    finally:
        cursor.close()
        conn.close()


# ===========================
# Logout
# ===========================
@app.route('/logout')
def logout():
    """Logout the user"""
    session.clear()
    flash("Logged out successfully.", "success")
    return redirect(url_for('login'))


# ===========================
# Dashboard (Salesperson)
# ===========================
@app.route('/dashboard')
def dashboard():
    """Salesperson dashboard showing their vehicles"""
    if 'user_id' not in session:
        return redirect(url_for('login'))

    salesperson_id = session['user_id']
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM Vehicles WHERE salesperson_id = %s", (salesperson_id,))
    vehicles = cursor.fetchall()
    conn.close()

    return render_template(
        'dashboard.html',
        user_name=session.get('user_name'),
        user_role=session.get('user_role'),
        vehicles=vehicles
    )


# ===========================
# Dashboard Stats (Salesperson)
# ===========================
@app.route('/dashboard/stats')
def dashboard_stats():
    """API endpoint to get vehicle stats for dashboard charts"""
    if 'user_id' not in session or session.get('user_role') != 'salesperson':
        flash("You must be logged in as salesperson.", "warning")
        return redirect(url_for('login'))

    salesperson_id = session['user_id']
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    # Vehicle status counts
    cursor.execute(
        "SELECT status, COUNT(*) as count FROM Vehicles WHERE salesperson_id = %s GROUP BY status",
        (salesperson_id,)
    )
    vehicle_status = cursor.fetchall()

    # Vehicles grouped by year
    cursor.execute(
        "SELECT year, COUNT(*) as count FROM Vehicles WHERE salesperson_id = %s GROUP BY year ORDER BY year",
        (salesperson_id,)
    )
    vehicle_years = cursor.fetchall()

    conn.close()

    return jsonify({
        "vehicle_status": vehicle_status,
        "vehicle_years": vehicle_years
    })


# ===========================
# Chat Assistant
# ===========================
@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat messages about vehicles"""
    data = request.get_json()
    message = data.get('message', '').lower()

    # Get current vehicles for context
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM Vehicles")
    vehicles = cursor.fetchall()
    conn.close()

    # Process different types of questions
    if 'available' in message or 'for sale' in message:
        available = [v for v in vehicles if v['status'] == 'Available']
        if available:
            response = "Yes! We have these vehicles available:\n"
            for v in available:
                response += f"• {v['name']} ({v['year']}) - ${v['price']}\n"
        else:
            response = "Sorry, we don't have any vehicles available right now."

    elif 'price' in message or 'cost' in message or 'expensive' in message or 'cheap' in message:
        if vehicles:
            cheapest = min(vehicles, key=lambda x: float(x['price']))
            most_expensive = max(vehicles, key=lambda x: float(x['price']))
            response = f"Our prices range from ${cheapest['price']} for the {cheapest['name']} to ${most_expensive['price']} for the {most_expensive['name']}."
        else:
            response = "I don't have any price information right now."

    elif 'newest' in message or 'latest' in message or 'year' in message:
        if vehicles:
            newest = max(vehicles, key=lambda x: int(x['year']))
            response = f"Our newest vehicle is the {newest['year']} {newest['name']}."
        else:
            response = "I don't have any vehicle year information right now."

    elif 'model' in message or 'brand' in message or 'make' in message:
        models = set(v['model'] for v in vehicles)
        if models:
            response = "We have these models: " + ", ".join(models)
        else:
            response = "I don't have any model information right now."

    else:
        response = "I can help you with information about our available vehicles, prices, models, and years. What would you like to know?"

    return jsonify({'response': response})

# ===========================
# Run the Flask App
# ===========================
if __name__ == '__main__':
    app.run(debug=True, port=5002)
