from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app, origins="*")


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///shein.sqlite"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

db = SQLAlchemy(app)
