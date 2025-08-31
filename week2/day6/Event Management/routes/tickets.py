from flask import Blueprint, request, jsonify, current_app
from database.index import get_db_connection

tickets_bp = Blueprint("tickets", __name__)

@tickets_bp.before_request
def check_api_key():
    api_key = request.headers.get("X-API-KEY")
    if api_key != current_app.config["SECRET_KEY"]:
        return jsonify({"error": "Unauthorized. Invalid API Key."}), 401


@tickets_bp.route("/", methods=["GET"])
def list_tickets():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tickets")
    tickets = cursor.fetchall()
    conn.close()
    return jsonify({"tickets":tickets})


@tickets_bp.route("/", methods=["POST"])
def create_ticket():
    data = request.json
    event_id = data.get("event_id")
    attendee_id = data.get("attendee_id")
    price = data.get("price")
    if not event_id or not attendee_id or not price:
        return jsonify({"error":"Missing fields"}),400

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO tickets (event_id, attendee_id, price) VALUES (%s,%s,%s) RETURNING *",
            (event_id, attendee_id, price)
        )
        ticket = cursor.fetchone()
        conn.commit()
    except Exception as e:
        conn.close()
        return jsonify({"error":"Ticket already exists or invalid data","detail":str(e)}),400

    conn.close()
    return jsonify({"ticket":ticket}),201
