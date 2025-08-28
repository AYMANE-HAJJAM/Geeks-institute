import os
import psycopg2

def connect_to_db():
    try:
        conn = psycopg2.connect(
            host=os.getenv('PGHOST'),
            database=os.getenv('PGDATABASE'),
            user=os.getenv('PGUSER'),
            password=os.getenv('PGPASSWORD'),
            sslmode=os.getenv('PGSSLMODE')
        )
        return conn
    except Exception as e:
        print("Connection failed:", e)
        return None
