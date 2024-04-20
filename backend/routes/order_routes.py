from flask import Blueprint, request, jsonify
from models import db, Order, OrderItem, Warehouse, StockItem, User
from sqlalchemy.orm import joinedload
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from sqlalchemy.orm import joinedload

order_bp = Blueprint("order_bp", __name__)


@jwt_required()
@order_bp.route("/orders", methods=["POST"])
def create_order():
    data = request.get_json()
    user_id = get_jwt_identity()
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


@order_bp.route("/orders", methods=["GET"])
def get_orders():
    orders = Order.query.all()
    orders_json = [order.to_json() for order in orders]
    return jsonify(orders_json), 200


from sqlalchemy.orm import joinedload


# @order_bp.route("/orders/<order_id>", methods=["GET"])
# def get_order_by_id(order_id):
#     order_id = int(order_id)  # Convert the order_id to an integer
#     order = Order.query.options(
#         joinedload(Order.user), joinedload(Order.order_items).joinedload(OrderItem.item)
#     ).get(order_id)

#     if order:
#         order_json = order.to_json()
#         order_json["user"] = order.user.to_json()
#         order_json["items"] = [
#             order_item.item.to_json() for order_item in order.order_items
#         ]
#         return jsonify(order_json), 200
#     else:
#         return jsonify({"error": "Order not found"}), 404
