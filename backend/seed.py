from flask import Flask
from models import db, Item, Warehouse, StockItem
from config import db as config_db

from models import db, Item, Warehouse, StockItem, User, Order, OrderItem
import random

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///shein.sqlite"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)


def add_items():
    items = [
        Item(name="T-shirt", description="Cotton T-shirt", price=20.00),
        Item(name="Jeans", description="Blue denim jeans", price=50.00),
        Item(name="Jacket", description="Leather jacket", price=150.00),
    ]
    for item in items:
        db.session.add(item)
    db.session.commit()


def add_warehouses():
    warehouses = [
        Warehouse(name="Warehouse A", latitude=40.7128, longitude=-74.0060),
        Warehouse(name="Warehouse B", latitude=34.0522, longitude=-118.2437),
    ]
    for warehouse in warehouses:
        db.session.add(warehouse)
    db.session.commit()


def add_stock_items():
    stock_items = [
        StockItem(item_id=1, warehouse_id=1, quantity=100),
        StockItem(item_id=2, warehouse_id=1, quantity=150),
        StockItem(item_id=3, warehouse_id=1, quantity=200),
        StockItem(item_id=1, warehouse_id=2, quantity=120),
        StockItem(item_id=2, warehouse_id=2, quantity=180),
        StockItem(item_id=3, warehouse_id=2, quantity=240),
    ]
    for stock_item in stock_items:
        db.session.add(stock_item)
    db.session.commit()


def add_users():
    users = [
        User(
            username="john_doe",
            email="john_doe@example.com",
            hashed_password="hashedpassword123",
        ),
        User(
            username="jane_doe",
            email="jane_doe@example.com",
            hashed_password="hashedpassword456",
        ),
    ]
    for user in users:
        db.session.add(user)
    db.session.commit()


def add_orders():
    orders = [
        Order(user_id=1, status="shipped"),
        Order(user_id=2, status="pending"),
    ]
    for order in orders:
        db.session.add(order)
    db.session.commit()


def add_order_items():
    items = Item.query.all()
    orders = Order.query.all()
    for order in orders:
        for _ in range(random.randint(1, 3)):
            item = random.choice(items)
            order_item = OrderItem(
                order_id=order.id, item_id=item.id, quantity=random.randint(1, 5)
            )
            db.session.add(order_item)
    db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        add_items()
        add_warehouses()
        add_stock_items()
        add_users()
        add_orders()
        add_order_items()
