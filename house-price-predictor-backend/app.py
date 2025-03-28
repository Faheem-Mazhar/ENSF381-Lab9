from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/validate_login', methods=['POST'])
def login():
    valid_credentials = {
        "alice": "password123",
        "bob": "secure456",
        "charlie": "qwerty789",
        "diana": "hunter2",
        "eve": "passpass",
        "frank": "letmein",
        "grace": "trustno1",
        "heidi": "admin123",
        "ivan": "welcome1",
        "judy": "password1"
    }
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username in valid_credentials and password == valid_credentials[username]:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
    
@app.route('/predict_house_price', methods=['POST'])
def predict_house_price():
    data = request.json
    
    







if __name__ == '__main__':
    app.run(debug=True)