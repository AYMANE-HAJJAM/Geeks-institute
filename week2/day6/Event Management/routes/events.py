from flask import Blueprint, request, jsonify, current_app
from database.index import get_db_connection

events_bp = Blueprint("events", __name__)


@events_bp.before_request
def check_api_key():
    api_key = request.headers.get("X-API-KEY")
    if api_key != current_app.config["SECRET_KEY"]:
        return jsonify({"error": "Unauthorized. Invalid API Key."}), 401




@events_bp.route("/", methods=["GET"])
def list_events():
    try:
        page = int(request.args.get("page", 1))
        limit = 6
        offset = (page-1) * limit
    except ValueError:
        return jsonify({"error": "Invalid page number"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection error"}), 500

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM events ORDER BY date LIMIT %s OFFSET %s", (limit, offset))
    events = cursor.fetchall()
    conn.close()

    return jsonify({"events": events})


@events_bp.route("/<int:event_id>", methods=["GET"])
def get_event(event_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection error"}), 500

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM events WHERE id = %s", (event_id,))
    event = cursor.fetchone()
    conn.close()

    if not event:
        return jsonify({"error": "Event not found"}), 404

    return jsonify({"event": event})



@events_bp.route('/', methods=['POST'])
def create_event():
    name = request.json.get('name', "")
    date = request.json.get('date', "")
    location = request.json.get('location', "")
    organizer_id = request.json.get('organizer_id', "")

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection error"}), 500

    cursor = conn.cursor()
    cursor.execute("INSERT INTO events (name, date, location, organizer_id) VALUES (%s, %s, %s, %s) RETURNING *",
                   (name, date, location, organizer_id))
    conn.commit()
    event = cursor.fetchone()
    conn.close()

    return jsonify({"message": "Event created", "event": event})


@events_bp.route('/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Database connection failed"}), 500

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM events WHERE id = %s", (event_id,))
    event = cursor.fetchone()

    if not event:
        return jsonify({"message": "Event not found"}), 404

    name = request.json.get('name', event['name'])
    date = request.json.get('date', event['date'])
    location = request.json.get('location', event['location'])
    organizer_id = request.json.get('organizer_id', event['organizer_id'])

    cursor.execute("UPDATE events SET name = %s, date = %s, location = %s, organizer_id = %s WHERE id = %s RETURNING *",
                   (name, date, location, organizer_id, event_id))
    conn.commit()
    event = cursor.fetchone()
    conn.close()

    return jsonify({"message": "Event updated", "event": event})


@events_bp.route('/<int:event_id>', methods=["DELETE"])
def delete_event(event_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Database connection failed"}), 500

    cursor = conn.cursor()
    cursor.execute(
        "DELETE FROM events WHERE id = %s RETURNING *", (event_id,))
    conn.commit()
    event = cursor.fetchone()
    conn.close()

    return jsonify({"message": "Event deleted", "event": event})
