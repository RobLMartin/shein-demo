from config import app, db
from routes.item_routes import item_bp
from routes.user_routes import user_bp
from routes.order_routes import order_bp

app.register_blueprint(item_bp)
app.register_blueprint(user_bp)
app.register_blueprint(order_bp)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
