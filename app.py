from flask import Flask, render_template, request, jsonify
# This line connects  logic file to my server
from logic import match_calculations 

app = Flask(__name__)

# Route to serve my HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle the calculation request
@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        # 1. Get the JSON data sent by JavaScript
        input_data = request.json 
        
        # 2. Run your cricket logic
        result = match_calculations(input_data)
        
        # 3. Send the result back to the browser
        return jsonify(result)
    except Exception as e:
        # If something crashes, send the error message to the browser console
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)