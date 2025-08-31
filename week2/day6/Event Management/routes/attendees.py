from flask import Blueprint, request, jsonify, current_app
from database.index import get_db_connection

attendees_bp = Blueprint("attendees", __name__)

@attendees_bp.before_request
def check_api_key():
    api_key = request.headers.get("X-API-KEY")
    if api_key != current_app.config["SECRET_KEY"]:
        return jsonify({"error": "Unauthorized. Invalid API Key."}), 401


@attendees_bp.route("/", methods=["GET"])
def list_attendees():
    page = int(request.args.get("page",1))
    limit = 6
    offset = (page-1)*limit
    search = request.args.get("search","")

    conn = get_db_connection()
    cursor = conn.cursor()
    if search:
        cursor.execute(
            "SELECT * FROM attendees WHERE name ILIKE %s ORDER BY name LIMIT %s OFFSET %s",
            (f"%{search}%", limit, offset)
        )
    else:
        cursor.execute("SELECT * FROM attendees ORDER BY name LIMIT %s OFFSET %s",(limit,offset))
    attendees = cursor.fetchall()
    conn.close()
    return jsonify({"attendees": attendees})


@attendees_bp.route("/<int:attendee_id>", methods=["GET"])
def get_attendee(attendee_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM attendees WHERE id=%s",(attendee_id,))
    attendee = cursor.fetchone()
    conn.close()
    if not attendee:
        return jsonify({"error":"Attendee not found"}),404
    return jsonify({"attendee":attendee})


@attendees_bp.route("/", methods=["POST"])
def create_attendee():
    data = request.json
    name = data.get("name","")
    email = data.get("email","")
    phone = data.get("phone","")
    if not name or not email:
        return jsonify({"error":"Missing fields"}),400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO attendees (name,email,phone) VALUES (%s,%s,%s) RETURNING *",(name,email,phone))
    attendee = cursor.fetchone()
    conn.commit()
    conn.close()
    return jsonify({"attendee":attendee}),201


@attendees_bp.route("/<int:attendee_id>", methods=["PUT"])
def update_attendee(attendee_id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM attendees WHERE id=%s",(attendee_id,))
    attendee = cursor.fetchone()
    if not attendee:
        conn.close()
        return jsonify({"error":"Attendee not found"}),404

    name = data.get("name",attendee["name"])
    email = data.get("email",attendee["email"])
    phone = data.get("phone",attendee["phone"])
    cursor.execute("UPDATE attendees SET name=%s,email=%s,phone=%s WHERE id=%s RETURNING *",(name,email,phone,attendee_id))
    updated = cursor.fetchone()
    conn.commit()
    conn.close()
    return jsonify({"attendee":updated})


@attendees_bp.route("/<int:attendee_id>", methods=["DELETE"])
def delete_attendee(attendee_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM attendees WHERE id=%s RETURNING *",(attendee_id,))
    deleted = cursor.fetchone()
    conn.commit()
    conn.close()
    if not deleted:
        return jsonify({"error":"Attendee not found"}),404
    return jsonify({"message":f"Attendee {attendee_id} deleted successfully"})

