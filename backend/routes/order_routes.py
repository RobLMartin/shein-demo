from flask import Blueprint, request, jsonify
from models import db, Order, OrderItem, Warehouse, StockItem, User
from sqlalchemy.orm import joinedload

order_bp = Blueprint("order_bp", __name__)


@order_bp.route("/orders", methods=["POST"])
def create_order():
    data = request.get_json()
    user_id = data["user_id"]
    items = data["items"]

    user_location = data.get("user_location")

    if not user_location:
        return jsonify({"error": "User location is required"}), 400

    new_order = Order(user_id=user_id)
    db.session.add(new_order)

    for item in items:
        stock_items = (
            StockItem.query.options(joinedload(StockItem.item))
            .filter_by(item_id=item["item_id"])
            .all()
        )
        if not stock_items:
            return jsonify({"error": "Item not found"}), 404

        stock_item = min(
            stock_items,
            key=lambda si: si.quantity >= item["quantity"]
            and si.warehouse.distance_to(user_location),
        )
        if stock_item and stock_item.quantity >= item["quantity"]:
            stock_item.quantity -= item["quantity"]
            order_item = OrderItem(
                order_id=new_order.id,
                item_id=item["item_id"],
                quantity=item["quantity"],
            )
            db.session.add(order_item)
        else:
            return jsonify({"error": "Insufficient stock for item"}), 400

    db.session.commit()
    return jsonify(new_order.to_json()), 201
