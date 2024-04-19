from flask import Blueprint, request, jsonify
from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

user_bp = Blueprint("user_bp", __name__)


@user_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data["password"], method="sha256")
    new_user = User(
        username=data["username"], email=data["email"], hashed_password=hashed_password
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_json()), 201


@user_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    if user and check_password_hash(user.hashed_password, data["password"]):
        access_token = create_access_token(identity=data["email"])
        return jsonify(
            access_token=access_token, message="Login successful", user=user.to_json()
        )
    return jsonify({"message": "Invalid credentials"}), 401
