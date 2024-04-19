from flask import Blueprint, jsonify, request
from models import Warehouse, StockItem, Item
from config import db

warehouse_bp = Blueprint("warehouse_bp", __name__)


@warehouse_bp.route("/warehouses", methods=["GET"])
def get_warehouses():
    warehouses = Warehouse.query.all()
    return jsonify([warehouse.to_json() for warehouse in warehouses])


@warehouse_bp.route("/warehouses/<int:id>", methods=["GET"])
def get_warehouse(id):
    warehouse = Warehouse.query.get_or_404(id)
    stock_items = StockItem.query.filter_by(warehouse_id=id).all()
    items_details = []
    for stock_item in stock_items:
        item = Item.query.get(stock_item.item_id)
        item_detail = item.to_json()
        item_detail["quantity"] = stock_item.quantity
        items_details.append(item_detail)
    warehouse_details = warehouse.to_json()
    warehouse_details["items"] = items_details
    return jsonify(warehouse_details)


@warehouse_bp.route(
    "/warehouses/<int:warehouse_id>/items/<int:item_id>", methods=["PUT"]
)
def update_item_quantity(warehouse_id, item_id):
    data = request.get_json()
    quantity = data.get("quantity")
    if quantity is None:
        return jsonify({"error": "Quantity is required"}), 400

    stock_item = StockItem.query.filter_by(
        warehouse_id=warehouse_id, item_id=item_id
    ).first()
    if not stock_item:
        return jsonify({"error": "Item not found in the specified warehouse"}), 404

    stock_item.quantity = quantity
    db.session.commit()

    return jsonify({"success": True, "message": "Quantity updated successfully"})


@warehouse_bp.route("/warehouses/<int:id>", methods=["DELETE"])
def delete_warehouse(id):
    warehouse = Warehouse.query.get_or_404(id)
    stock_items = StockItem.query.filter_by(warehouse_id=id).all()

    for stock_item in stock_items:
        db.session.delete(stock_item)

    db.session.delete(warehouse)
    db.session.commit()

    return jsonify(
        {
            "success": True,
            "message": "Warehouse and its stock items deleted successfully",
        }
    )


@warehouse_bp.route("/warehouses/<int:warehouse_id>/items", methods=["POST"])
def add_stock_item(warehouse_id):
    data = request.get_json()
    item_id = data.get("itemId")
    quantity = data.get("quantity")

    if not item_id or quantity is None:
        return jsonify({"error": "Item ID and quantity are required"}), 400

    item = Item.query.get(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    existing_stock_item = StockItem.query.filter_by(
        item_id=item_id, warehouse_id=warehouse_id
    ).first()
    if existing_stock_item:
        return jsonify({"error": "Item already exists in the warehouse"}), 400

    new_stock_item = StockItem(
        item_id=item_id, warehouse_id=warehouse_id, quantity=quantity
    )
    db.session.add(new_stock_item)
    db.session.commit()

    return jsonify({"success": True, "message": "Stock item added successfully"}), 201
