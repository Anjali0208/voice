from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import main
app = Flask(__name__)

CORS(app)

@app.route('/Bot-response-function', methods=["Post"])
def jsonHandle():
    req_data = request.get_json()
    bot_response = "Custom Response"
    user_input = req_data["user-input"]

    bot_response = main.chatbot_response(user_input)

    return jsonify({
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": {
            "user-input": user_input,
            "response": bot_response
        }
    })


app.run()
