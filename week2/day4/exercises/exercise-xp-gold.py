import psycopg2
import bcrypt

conn = psycopg2.connect(
    dbname="Authentication",
    user="postgres",
    password="123456",
    host="localhost",
    port="5432"
)

# Hash password
def hash_password(password):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

# Check password
def check_password(password, hashed):
    return bcrypt.checkpw(password.encode(), hashed.encode())


while True:
    choice = input("login, signup, or exit: ").strip().lower()
    
    if choice == "exit":
        print("Exiting...")
        break

    elif choice == "login":
        username = input("username: ").strip()
        password = input("password: ").strip()

        with conn.cursor() as cursor:
            cursor.execute("SELECT password FROM users WHERE username = %s", (username,))
            result = cursor.fetchone()

        if result and check_password(password, result[0]):
            logged_in = username
            print(f"You are now logged in! Welcome {logged_in}")
        else:
            print("Invalid username or password.")
            signup_choice = input("Do you want to sign up? (y/n): ").strip().lower()
            if signup_choice == "y":
                while True:
                    new_username = input("Enter a new username: ").strip()
                    with conn.cursor() as cursor:
                        cursor.execute("SELECT * FROM users WHERE username = %s", (new_username,))
                        if cursor.fetchone():
                            print("Username already exists. Try again.")
                        else:
                            break
                new_password = input("Enter a new password: ").strip()
                hashed = hash_password(new_password)
                with conn.cursor() as cursor:
                    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (new_username, hashed))
                    conn.commit()
                print(f"Sign up successful! Welcome {new_username}")

    elif choice == "signup":
        while True:
            new_username = input("Enter a new username: ").strip()
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE username = %s", (new_username,))
                if cursor.fetchone():
                    print("Username already exists. Try again.")
                else:
                    break
        new_password = input("Enter a new password: ").strip()
        hashed = hash_password(new_password)
        with conn.cursor() as cursor:
            cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (new_username, hashed))
            conn.commit()
        print(f"Sign up successful! Welcome {new_username}")

    else:
        print("Invalid action. Choose 'login', 'signup', or 'exit'.")
