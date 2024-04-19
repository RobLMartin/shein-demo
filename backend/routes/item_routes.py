from flask import Blueprint, request, jsonify
from models import db, Item

item_bp = Blueprint("item_bp", __name__)


@item_bp.route("/items", methods=["POST"])
def create_item():
    data = request.get_json()
    new_item = Item(
        name=data["name"], description=data["description"], price=data["price"]
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.to_json()), 201


@item_bp.route("/items", methods=["GET"])
def get_items():
    items = Item.query.all()
    return jsonify([item.to_json() for item in items])


@item_bp.route("/items/<int:id>", methods=["GET"])
def get_item(id):
    item = Item.query.get_or_404(id)
    return jsonify(item.to_json())


@item_bp.route("/items/<int:id>", methods=["PUT"])
def update_item(id):
    item = Item.query.get_or_404(id)
    data = request.get_json()
    item.name = data["name"]
    item.description = data["description"]
    item.price = data["price"]
    db.session.commit()
    return jsonify(item.to_json())


@item_bp.route("/items/<int:id>", methods=["DELETE"])
def delete_item(id):
    item = Item.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item deleted successfully"})
