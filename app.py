from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/generate-diagram', methods=['POST'])
def generate_diagram():
    # Get the question from the frontend
    data = request.json
    question = data.get('question')

    # Process the question (for now, just return a dummy response)
    response = {
        "status": "success",
        "message": f"Received question: {question}",
        "diagram_data": {
            "angle": 120,  # Example: Angle between tangents
            "radius": 100  # Example: Radius of the circle
        }
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)