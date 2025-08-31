from flask import Flask
from routes.events import events_bp
from routes.organizers import organizers_bp
from routes.attendees import attendees_bp
from routes.tickets import tickets_bp
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

app.register_blueprint(events_bp, url_prefix="/events")
app.register_blueprint(organizers_bp, url_prefix="/organizers")
app.register_blueprint(attendees_bp, url_prefix="/attendees")
app.register_blueprint(tickets_bp, url_prefix="/tickets")

if __name__ == "__main__":
    app.run(debug=True, port=5001)
