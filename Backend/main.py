from flask_socketio import SocketIO
from flask import Flask, request, make_response, jsonify
from pymongo import MongoClient
from bson import ObjectId


app = Flask(__name__)
socketio = SocketIO(app)

client = MongoClient("mongodb+srv://abha25meshram:Foodify@cluster0.siiwyju.mongodb.net/Foodify?retryWrites=true&w=majority")
db = client["Foodify"]
menu_collection = db["menu"]
orders_collection = db["orders"]
feedback_collection = db["feedback"]

menu = []
orders = []
order_id_counter = 1

@socketio.on('order_status_update')
def handle_order_status_update(data):
    order_id = data['order_id']
    new_status = data['new_status']
    # Process the order status update
    # Send the updated order status to the customer's interface
    socketio.emit('order_status_update', {'order_id': order_id, 'new_status': new_status}, broadcast=True)
# After updating the order status



@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"  # Set the allowed origin(s) here
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"  # Set the allowed methods
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"  # Set the allowed headers
    return response

@app.after_request
def apply_cors_headers(response):
    return add_cors_headers(response)

#---------------------------------------Home page--------------------------------
    
@app.route('/',methods=["GET"]) 
def index():
    response = make_response('Welcome Foodies in Foodify!')
    response.status_code = 200
    return response

#--------------------------------------- GET Menu --------------------------------

@app.route("/menu", methods=["GET"])
def get_menu():
    menu_data = menu_collection.find_one()
    if menu_data:
        return jsonify(menu_data.get("menu", []))
    else:
        return jsonify([])
    
 #--------------------------------------- GET Orders --------------------------------   
    
@app.route("/orders", methods=["GET"])
def review_orders():
    try:
        orders_data = list(orders_collection.find())
        if orders_data:
            for order in orders_data:
                order["_id"] = str(order["_id"])
            return jsonify(orders_data)
        else:
            return "No orders found", 404
    except Exception as e:
        return f"Error retrieving orders: {str(e)}", 500

#------------------------------------------AddItem POST------------------------------

@app.route("/add", methods=["POST"])
def add_dish():
    dish = request.get_json()
    menu.append(dish)
    save_data()
    menu_collection.replace_one({}, {"menu": menu}, upsert=True)
    return "Dish added to the menu."

# {
#   "dish_id":2,
#   "dish_name":"idli",
#   "price":40,
#   "availability":"no"
# }

#----------------------------------------Menu/id  DELETE----------------------------------------

@app.route("/menu/<dish_id>", methods=["DELETE"])
def remove_dish(dish_id):
    for dish in menu:
        if dish["dish_id"] == int(dish_id):
            menu.remove(dish)
            save_data()
            return "Dish removed from the menu."
    return "Dish not found in the menu."

#--------------------------------------Menu/id PUT ----------------------------- 

@app.route("/menu/<dish_id>", methods=["PUT"])
def update_availability(dish_id):
    for dish in menu:
        if dish["id"] == dish_id:
            dish["availability"] = not dish["availability"]
            save_data()
            return "Availability updated."
    return "Dish not found in the menu."

#-------------------------------------------POST orders--------------------------
@app.route("/orders", methods=["POST"])
def take_order():
    order = request.get_json()
    dish_ids = order.get("dish_ids", [])
    person_name = order.get("person_name")

    ordered_dishes = []
    total_price = 0

    if not dish_ids:
        return "No dish IDs provided.", 400

    for dish_id in dish_ids:
        valid_dish = False
        dish = menu_collection.find_one({"dish_id": int(dish_id), "availability": "yes"})
        if dish:
            ordered_dishes.append(dish)
            total_price += dish["price"]
            valid_dish = True

        if not valid_dish:
            return f"Invalid dish ID: {dish_id} or dish is not available.", 400

    order_data = {
        "dishes": ordered_dishes,
        "status": "Received",
        "total_price": total_price,
        "person_name": person_name
    }

    orders_collection.insert_one(order_data)

    return "Order placed successfully."

#-----------------------------------------PUT Orders-----------------------------------------

@app.route("/orders/<int:order_id>", methods=["PUT"])
def update_order_status(order_id):
    status_choice = request.get_json()["status"]
    order = orders_collection.find_one({"orders.id": order_id})

    if order:
        for item in order["orders"]:
            if item["id"] == order_id:
                item["status"] = status_choice
                break
        orders_collection.replace_one({"orders.id": order_id}, order)
        socketio.emit('order_status_update', {'order_id': order_id, 'new_status': status_choice}, broadcast=True)

        return "Status updated."
    else:
        return "Order not found."



#------------------------------------------orders/status GET------------------------------------------

@app.route("/orders/<status_choice>", methods=["GET"])
def filter_orders_by_status_choice(status_choice):
    filtered_orders = [order for order in orders if order["status"].lower() == status_choice.lower()]
    return jsonify(filtered_orders)


#------------------------------------------feedbacks GET------------------------------------------

@app.route("/feedback", methods=["POST"])
def submit_feedback():
    feedback_data = request.get_json()
    feedback_collection.insert_one(feedback_data)

    return "Feedback submitted successfully"


#------------------------------------------ feedback/dish/id  GET------------------------------------------

@app.route("/feedback/dish/<dish_id>", methods=["GET"])
def get_feedback_for_dish(dish_id):
    feedback = feedback_collection.find({"dish_id": dish_id})
    feedback_list = []
    for item in feedback:
        feedback_list.append({
            "dish_id": item["dish_id"],
            "order_id": item["order_id"],
            "rating": item["rating"],
            "review": item["review"],
            "customer_id": item["customer_id"],
            "timestamp": item["timestamp"]
        })
    return jsonify(feedback_list)

            # "dish_id": 1,
            # "order_id": 1,
            # "rating": 4,
            # "review": "nice food",
            # "customer_id":1,
            # "timestamp": "8:04"

#-------------------------------------------LOAD DATA--------------------------------

def load_data():
    global menu, orders, order_id_counter

    menu_data = menu_collection.find_one()
    if menu_data:
        menu = menu_data.get("menu", [])

    orders_data = orders_collection.find_one()
    if orders_data:
        orders = orders_data.get("orders", [])

    order_id_counter = len(orders)

#--------------------------------------------SAVE DATA  ---------------------------


def save_data():
    menu_data = {"menu": menu}
    menu_collection.replace_one({}, menu_data, upsert=True)

    orders_data = {"orders": orders}
    orders_collection.replace_one({}, orders_data, upsert=True)



if __name__ == "__main__":
    load_data()
    app.run()
