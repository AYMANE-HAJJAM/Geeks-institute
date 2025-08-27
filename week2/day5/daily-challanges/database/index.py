import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

def connect_to_db():
    try:
        conn = psycopg2.connect(
            host=os.getenv('PGHOST'),
            database=os.getenv('PGDATABASE'),
            user=os.getenv('PGUSER'),
            password=os.getenv('PGPASSWORD'),
            sslmode=os.getenv('PGSSLMODE')
        )
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT NOW()")
        print(cursor.fetchone())
        conn.close()
    except Exception as e:
        print("Connection failed:", e)
