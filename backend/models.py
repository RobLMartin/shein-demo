from config import db


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(300))
    price = db.Column(db.Float, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
        }


class Warehouse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude,
        }


class StockItem(db.Model):
    item_id = db.Column(db.Integer, db.ForeignKey("item.id"), primary_key=True)
    warehouse_id = db.Column(
        db.Integer, db.ForeignKey("warehouse.id"), primary_key=True
    )
    quantity = db.Column(db.Integer, nullable=False)
    item = db.relationship("Item", backref="stock_items")
    warehouse = db.relationship("Warehouse", backref="stock_items")

    def to_json(self):
        return {
            "item_id": self.item_id,
            "warehouse_id": self.warehouse_id,
            "quantity": self.quantity,
        }


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    status = db.Column(db.String(100), default="pending")
    user = db.relationship("User", backref="orders")
    order_items = db.relationship("OrderItem", backref="order")

    def to_json(self):
        return {"id": self.id, "user_id": self.user_id, "status": self.status}


class OrderItem(db.Model):
    order_id = db.Column(db.Integer, db.ForeignKey("order.id"), primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey("item.id"), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)

    def to_json(self):
        return {
            "order_id": self.order_id,
            "item_id": self.item_id,
            "quantity": self.quantity,
        }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    hashed_password = db.Column(db.String(200), nullable=False)

    def to_json(self):
        return {"id": self.id, "username": self.username, "email": self.email}
