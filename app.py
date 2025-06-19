from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/generate-diagram', methods=['POST'])
def generate_diagram():

    if not os.path.isdir('/static'):
        os.mkdir('/static')
        
    print("GENERATING THE DIAGRAM!!!!!!!!!!!!")
    # Get the question from the frontend
    data = request.json
    question = data.get('question')

    load_dotenv()
    api_key = os.getenv("API_KEY")
    print("Received data:", data)  # DEBUG
    genai.configure(api_key=api_key)

    model = genai.GenerativeModel('gemini-2.0-flash-lite')
    response = model.generate_content(f"""
You are a helpful assistant that writes clean, correct, and well-commented Python code using matplotlib.

Generate only the Python code to create an accurate, clear, and labeled diagram for the following geometry-related question:
\"\"\"
{question}
\"\"\"

Strict instructions:
1. Use only `matplotlib.pyplot`, `matplotlib.patches`, and standard libraries.
2. Use precise geometry — define all points using exact coordinates.
3. When drawing arcs:
    - Use `matplotlib.patches.Arc`.
    - Clearly define start and end angles using `theta1` and `theta2`.
    - Indicate direction of arc: clockwise or counterclockwise using appropriate angle values.
    - Ensure arcs are small unless explicitly needed to be large.
    - Invert arcs by using `theta1 > theta2` if needed.
    - Avoid overlapping or misaligned arcs.
4. Add labels and annotations as needed.
5. Add axis limits, aspect ratio (`set_aspect('equal')`) and grid if helpful.
6. Save the diagram as 'static/diagram.png' using `plt.savefig(...)`.
7. Do not include answers, explanations, or print statements.
8. Do not include a plot title.

Only return the Python code — no explanations.
""")


    generated_code = response.text

    if generated_code.startswith("```python"):
        generated_code = generated_code.replace("```python", "", 1).strip()
    if generated_code.endswith("```"):
        generated_code = generated_code.rsplit("```", 1)[0].strip()

    with open('diagramGen.py', 'w', encoding='utf-8') as f:
        f.write("# -*- coding: utf-8 -*-\n")
        f.write(generated_code)

    subprocess.run(['python', 'diagramGen.py'])

    return jsonify({"message": "Diagram code generated successfully."})


@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)


if __name__ == '__main__':
    app.run(debug=False)