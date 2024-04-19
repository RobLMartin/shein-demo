from flask import request, jsonify
from config import app, db
from models import Item


# Create a new item
@app.route("/items", methods=["POST"])
def create_item():
    data = request.get_json()
    new_item = Item(
        name=data["name"],
        description=data["description"],
        price=data["price"],
        quantity=data["quantity"],
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify({"message": "Item created successfully"}), 201


# Get all items
@app.route("/items", methods=["GET"])
def get_items():
    items = Item.query.all()
    return jsonify(
        [
            {
                "id": item.id,
                "name": item.name,
                "description": item.description,
                "price": item.price,
                "quantity": item.quantity,
            }
            for item in items
        ]
    )


# Update an item
@app.route("/items/<int:id>", methods=["PUT"])
def update_item(id):
    item = Item.query.get(id)
    if not item:
        return jsonify({"message": "Item not found"}), 404
    data = request.get_json()
    item.name = data["name"]
    item.description = data["description"]
    item.price = data["price"]
    item.quantity = data["quantity"]
    db.session.commit()
    return jsonify({"message": "Item updated successfully"})


# Delete an item
@app.route("/items/<int:id>", methods=["DELETE"])
def delete_item(id):
    item = Item.query.get(id)
    if item:
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Item deleted successfully"})
    return jsonify({"message": "Item not found"}), 404


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
