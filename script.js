// function generateDiagram() {
//     const question = document.getElementById('question').value;
//     const angle = parseInt(question.match(/\d+/)[0]); // Extract the angle
//     const radians = (angle / 2) * (Math.PI / 180); // Convert to radians
//     const tangentLength = 150;

//     // Clear the canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw circle
//     ctx.beginPath();
//     ctx.arc(200, 200, 100, 0, 2 * Math.PI);
//     ctx.stroke();

//     // Draw tangents
//     ctx.beginPath();
//     ctx.moveTo(200, 200);
//     ctx.lineTo(200 + tangentLength * Math.cos(radians), 200 - tangentLength * Math.sin(radians));
//     ctx.stroke();

//     ctx.beginPath();
//     ctx.moveTo(200, 200);
//     ctx.lineTo(200 + tangentLength * Math.cos(-radians), 200 - tangentLength * Math.sin(-radians));
//     ctx.stroke();
// }
const canvas = document.getElementById('mathCanvas');
const ctx = canvas.getContext('2d');

// // Draw a circle
// ctx.beginPath();
// ctx.arc(200, 200, 100, 0, 2 * Math.PI); // Center (200,200), radius 100
// ctx.stroke();

// // Draw two lines (hardcoded for now)
// ctx.beginPath();
// ctx.moveTo(200, 200); // Start point
// ctx.lineTo(300, 100); // End point
// ctx.stroke();

// ctx.beginPath();
// ctx.moveTo(200, 200); // Start point
// ctx.lineTo(100, 100); // End point
// ctx.stroke();
function generateDiagram() {
    const question = document.getElementById('question').value;
    const radius = Number(document.getElementById('radius').value);

    const angle = Number(question); // Hardcoded for now
    const radians = (angle / 2) * (Math.PI / 180); // Convert to radians
    const tangentLength = radius;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circle
    ctx.beginPath();
    ctx.arc(200, 200, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw tangents
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(200 + tangentLength * Math.cos(radians), 200 - tangentLength * Math.sin(radians));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(200 + tangentLength * Math.cos(-radians), 200 - tangentLength * Math.sin(-radians));
    ctx.stroke();
}
// function generateDiagram() {
//     const question = document.getElementById('question').value;

//     // Send the question to the backend
//     fetch('http://127.0.0.1:5000/generate-diagram', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ question: question }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Display the response
//         document.getElementById('response').innerText = JSON.stringify(data, null, 2);

//         // Draw the diagram (for now, just log the data)
//         console.log(data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

// function generateDiagram() {
//     const question = document.getElementById('question').value;


//     // backend
// // Send the question to the backend
// fetch('http://127.0.0.1:5000/generate-diagram', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ question: question }),
// })
// .then(response => response.json()).then(data=>{
//     const angle = data.angle;
//     const radians = (angle / 2) * (Math.PI / 180); // Convert to radians
//     const tangentLength = 150;
//      // Clear the canvas
//      ctx.clearRect(0, 0, canvas.width, canvas.height);

//      // Draw circle
//      ctx.beginPath();
//      ctx.arc(200, 200, 100, 0, 2 * Math.PI);
//      ctx.stroke();
 
//      // Draw tangents
//      ctx.beginPath();
//      ctx.moveTo(200, 200);
//      ctx.lineTo(200 + tangentLength * Math.cos(radians), 200 - tangentLength * Math.sin(radians));
//      ctx.stroke();
 
//      ctx.beginPath();
//      ctx.moveTo(200, 200);
//      ctx.lineTo(200 + tangentLength * Math.cos(-radians), 200 - tangentLength * Math.sin(-radians));
//      ctx.stroke();
// })
// }