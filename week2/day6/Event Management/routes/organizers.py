from flask import Blueprint, request, jsonify, current_app
from database.index import get_db_connection

organizers_bp = Blueprint("organizers", __name__)



@organizers_bp.before_request
def check_api_key():
    api_key = request.headers.get("X-API-KEY")
    if api_key != current_app.config["SECRET_KEY"]:
        return jsonify({"error": "Unauthorized. Invalid API Key."}), 401



@organizers_bp.route("/", methods=["GET"])
def list_organizers():
    page = int(request.args.get("page", 1))
    limit = 6
    offset = (page-1)*limit
    search = request.args.get("search", "")

    conn = get_db_connection()
    cursor = conn.cursor()
    if search:
        cursor.execute(
            "SELECT * FROM organizers WHERE name ILIKE %s ORDER BY name LIMIT %s OFFSET %s",
            (f"%{search}%", limit, offset)
        )
    else:
        cursor.execute("SELECT * FROM organizers ORDER BY name LIMIT %s OFFSET %s", (limit, offset))
    organizers = cursor.fetchall()
    conn.close()
    return jsonify({"organizers": organizers})



@organizers_bp.route("/<int:organizer_id>", methods=["GET"])
def get_organizer(organizer_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM organizers WHERE id=%s", (organizer_id,))
    organizer = cursor.fetchone()
    conn.close()
    if not organizer:
        return jsonify({"error": "Organizer not found"}), 404
    return jsonify({"organizer": organizer})



@organizers_bp.route("/", methods=["POST"])
def create_organizer():
    data = request.json
    name = data.get("name", "")
    email = data.get("email", "")
    if not name or not email:
        return jsonify({"error": "Missing fields"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO organizers (name,email) VALUES (%s,%s) RETURNING *", (name,email))
    organizer = cursor.fetchone()
    conn.commit()
    conn.close()
    return jsonify({"organizer": organizer}), 201



@organizers_bp.route("/<int:organizer_id>", methods=["PUT"])
def update_organizer(organizer_id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM organizers WHERE id=%s", (organizer_id,))
    organizer = cursor.fetchone()
    if not organizer:
        conn.close()
        return jsonify({"error": "Organizer not found"}), 404

    name = data.get("name", organizer["name"])
    email = data.get("email", organizer["email"])
    cursor.execute("UPDATE organizers SET name=%s, email=%s WHERE id=%s RETURNING *", (name,email,organizer_id))
    updated = cursor.fetchone()
    conn.commit()
    conn.close()
    return jsonify({"organizer": updated})


@organizers_bp.route("/<int:organizer_id>", methods=["DELETE"])
def delete_organizer(organizer_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM organizers WHERE id=%s RETURNING *", (organizer_id,))
    deleted = cursor.fetchone()
    conn.commit()
    conn.close()
    if not deleted:
        return jsonify({"error": "Organizer not found"}), 404
    return jsonify({"message": f"Organizer {organizer_id} deleted successfully"})
