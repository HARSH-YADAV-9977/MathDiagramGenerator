const textarea = document.getElementById('question');

textarea.addEventListener('input', function () {
  this.style.height = 'auto'; // Reset height to shrink if needed
  this.style.height = (this.scrollHeight) + 'q'; // Set height to scroll height
});

const loadingMessages = [
  "Generating.........",
  "This may take some time........"
];
let loadingIndex = 0;
let loadingInterval;

console.log("script.js loaded");
async function generateDiagram() {
    const question = document.getElementById('question').value;
    console.log('request sent')
    const loadingGif = document.getElementById('loadingGif');
    const loadingText = document.getElementById('loadingText');
    const diagramImage = document.getElementById('diagramImage');

    loadingGif.style.display = 'block';
    loadingText.style.display = 'block';
    diagramImage.style.display = 'none';

    loadingText.textContent = loadingMessages[loadingIndex];
    loadingInterval = setInterval(() => {
        loadingIndex = (loadingIndex + 1) % loadingMessages.length;
        loadingText.textContent = loadingMessages[loadingIndex];
    }, 10000);

    try {
        const response = await fetch('http://127.0.0.1:5000/generate-diagram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: question })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        
        
        const imageUrl = 'http://127.0.0.1:5000/static/diagram.png?t=' + new Date().getTime();
        console.log("Updating image to:", imageUrl);
        diagramImage.onload = () => {
            clearInterval(loadingInterval);
            loadingGif.style.display = 'none';
            loadingText.style.display = 'none';
            diagramImage.style.display = 'block';
            loadingIndex = 0;
        };
        diagramImage.src = imageUrl;

    } catch (error) {
        clearInterval(loadingInterval);
        loadingGif.style.display = 'none';
        loadingText.style.display = 'none';
        loadingIndex = 0;
        console.error("Error generating diagram:", error);
        alert("Failed to generate diagram.");
    }
}

