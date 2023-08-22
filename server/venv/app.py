import uuid
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS




app = Flask(__name__)
CORS(app)

todo_list = []

# Todo List App CRUD
'''
- Save User Todos (Post)
- Get User Todos (Get )
- Delete User Todos (Delete)
- update User Todo  (Update)
'''


@app.route('/todos', methods=["GET", "POST"]) # Get and Post
def todo():
    # POST
    if request.method == 'POST':
        todo_id = uuid.uuid4() # Get unique id for todo
        data_obj = request.get_json()
        todo = {**data_obj,  "id": todo_id}

        todo_list.append(todo) # Add new todo to List of todos

        return jsonify(data = todo_list, mesage = 'Created Successfully')
    # GET
    if request.method == 'GET':
        return jsonify(data = todo_list)




@app.route('/todos/<todo_id>', methods=["PUT", "DELETE"])
def process_todo(todo_id):
    # PUT
    if request.method == 'PUT':
        found_todo = {}
        data = request.get_json()

        for index ,todo in enumerate(todo_list):

            if todo_id == str(todo["id"]):
                found_todo = {**data, "id": todo_id}
                todo_list[index] = found_todo
                return jsonify(data = todo_list, mesage = 'Update Successfully')

        if found_todo == {}:
            return make_response(jsonify(mesage='todo id not found'), 404)
    # DELETE
    if request.method == 'DELETE':
        id_is_present = False
        for todo in todo_list:
            if todo_id == str(todo["id"]):
                id_is_present = True
                todo_list.remove(todo)
                return jsonify(data = todo_list, mesage = 'Deleted Successfully')

        if not id_is_present:
            return make_response(jsonify(mesage='todo id not found'), 404)


