from flask import Flask, jsonify, request, render_template, redirect, url_for, session
from database.index import connect_to_db
from psycopg2.extras import RealDictCursor
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)

app.secret_key = os.getenv('SECRET_KEY')

@app.route('/', methods=['GET'])
def index():
    conn = connect_to_db()
    if conn is None:
        return "Database connection failed", 500
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM Vehicles")
    vehicles = cursor.fetchall()
    conn.close()
    return render_template('index.html', vehicles=vehicles)


@app.route('/vehicles/<int:vehicle_id>', methods=['GET'])
def vehicle_details(vehicle_id):
    conn = connect_to_db()
    if conn is None:
        return "Database connection failed", 500
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM Vehicles WHERE id = %s", (vehicle_id,))
    vehicle = cursor.fetchone()
    conn.close()
    if vehicle is None:
        return "Vehicle not found", 404
    return render_template('vehicle_details.html', vehicle=vehicle)


@app.route('/search')
def search():
    conn = connect_to_db()
    if conn is None:
        return "Database connection failed", 500
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    query = request.args.get('q', '').strip()
    if query:
        cursor.execute(
            "SELECT * FROM Vehicles WHERE name ILIKE %s OR model ILIKE %s",
            (f'%{query}%', f'%{query}%')
        )
        vehicles = cursor.fetchall()
    else:
        vehicles = []
    conn.close()
    return render_template('index.html', vehicles=vehicles, query=query)

@app.route('/login', methods=['GET', 'POST'])
def login():
    # Redirect if already logged in
    if 'user_id' in session:
        if session.get('user_role') == 'salesperson':
            return redirect(url_for('dashboard'))
        else:
            return redirect(url_for('index'))
    message = None
    email = ''
    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '').strip()
        if not email or not password:
            message = "Please enter both email and password."
            return render_template('login.html', message=message, email=email)
        conn = connect_to_db()
        if conn is None:
            return "Database connection failed", 500
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        # Check salespeople first
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
            if role == 'salesperson':
                return redirect(url_for('dashboard'))
            else:
                return redirect(url_for('index'))
        else:
            message = "Invalid email or password."
    return render_template('login.html', message=message, email=email)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    message = None
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        role = request.form.get('role', 'customer')  # default to customer if not provided

        hashed_password = generate_password_hash(password)
        conn = connect_to_db()
        if conn is None:
            return "Database connection failed", 500
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
            message = "Signup successful! You can now login."
        except Exception as e:
            conn.rollback()
            # Friendly error message
            if 'unique constraint' in str(e).lower() or 'duplicate key' in str(e).lower():
                message = "This email is already registered."
            else:
                message = "Signup failed. Please try again."
        finally:
            conn.close()
        return render_template('signup.html', message=message)
    return render_template('signup.html', message=message)

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

@app.route('/vehicles/create', methods=['GET', 'POST'])
def create_vehicle():
    if 'user_id' not in session or session.get('user_role') != 'salesperson':
        return redirect(url_for('login'))
    message = None
    if request.method == 'POST':
        name = request.form['name']
        model = request.form['model']
        price = request.form['price']
        year = request.form['year']
        status = request.form['status']
        conn = connect_to_db()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO Vehicles (name, model, price, year, status) VALUES (%s, %s, %s, %s, %s)",
                (name, model, price, year, status)
            )
            conn.commit()
            message = "Vehicle created successfully."
        except Exception as e:
            conn.rollback()
            message = "Failed to create vehicle."
        finally:
            conn.close()
        return redirect(url_for('dashboard'))
    return render_template('vehicle_form.html', action="Create", message=message)

@app.route('/vehicles/<int:vehicle_id>/edit', methods=['GET', 'POST'])
def edit_vehicle(vehicle_id):
    if 'user_id' not in session or session.get('user_role') != 'salesperson':
        return redirect(url_for('login'))
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM Vehicles WHERE id = %s", (vehicle_id,))
    vehicle = cursor.fetchone()
    if not vehicle:
        conn.close()
        return "Vehicle not found", 404
    message = None
    if request.method == 'POST':
        name = request.form['name']
        model = request.form['model']
        price = request.form['price']
        year = request.form['year']
        status = request.form['status']
        try:
            cursor2 = conn.cursor()
            cursor2.execute(
                "UPDATE Vehicles SET name=%s, model=%s, price=%s, year=%s, status=%s WHERE id=%s",
                (name, model, price, year, status, vehicle_id)
            )
            conn.commit()
            message = "Vehicle updated successfully."
        except Exception as e:
            conn.rollback()
            message = "Failed to update vehicle."
        finally:
            conn.close()
        return redirect(url_for('dashboard'))
    conn.close()
    return render_template('vehicle_form.html', action="Edit", vehicle=vehicle, message=message)

@app.route('/vehicles/<int:vehicle_id>/delete', methods=['POST'])
def delete_vehicle(vehicle_id):
    if 'user_id' not in session or session.get('user_role') != 'salesperson':
        return redirect(url_for('login'))
    conn = connect_to_db()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM Vehicles WHERE id = %s", (vehicle_id,))
        conn.commit()
    except Exception as e:
        conn.rollback()
    finally:
        conn.close()
    return redirect(url_for('dashboard'))

@app.route('/salles/create', methods=['GET', 'POST'])
def create_salle():
    message = None
    if request.method == 'POST':
        name = request.form['name']
        location = request.form['location']
        salesperson_id = session['user_id']
        conn = connect_to_db()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO salles (name, location, salesperson_id) VALUES (%s, %s, %s)",
                (name, location, salesperson_id)
            )
            conn.commit()
            message = "Salle created successfully."
            return redirect(url_for('dashboard'))
        except Exception as e:
            conn.rollback()
            message = "Failed to create salle."
        finally:
            conn.close()
    return render_template('salle_form.html', message=message)

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))




if __name__ == '__main__':
    app.run(debug=True, port=5002)