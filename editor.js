let eefData = { pages: [{ elements: [] }] }; // Store EEF data
const canvas = document.getElementById("editorCanvas");
const ctx = canvas.getContext("2d");
let selectedText = null;

// HTML Elements
const textEditor = document.getElementById("textEditor");
const textInput = document.getElementById("textInput");
const fontSelect = document.getElementById("fontSelect");
const fontSize = document.getElementById("fontSize");
const textColor = document.getElementById("textColor");

// 📌 Load EEF File
document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        eefData = JSON.parse(e.target.result);
        renderCanvas();
    };
    reader.readAsText(file);
});

// 📌 Render Text on Canvas
function renderCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    eefData.pages[0].elements.forEach(element => {
        if (element.type === "text") {
            ctx.font = `${element.size}px ${element.font}`;
            ctx.fillStyle = element.color;
            ctx.fillText(element.content, element.x, element.y);
        }
    });
}

// 📌 Detect Click on Text & Show Editor
canvas.addEventListener("click", function(event) {
    const x = event.offsetX, y = event.offsetY;

    eefData.pages[0].elements.forEach(element => {
        if (element.type === "text") {
            const textWidth = ctx.measureText(element.content).width;
            const textHeight = element.size;

            if (x >= element.x && x <= element.x + textWidth && y >= element.y - textHeight && y <= element.y) {
                selectedText = element;
                showTextEditor(element, x, y);
            }
        }
    });
});

// 📌 Show Text Editor Toolbar
function showTextEditor(element, x, y) {
    textEditor.classList.remove("hidden");
    textEditor.style.left = `${canvas.offsetLeft + x}px`;
    textEditor.style.top = `${canvas.offsetTop + y}px`;

    textInput.value = element.content;
    fontSelect.value = element.font;
    fontSize.value = element.size;
    textColor.value = element.color;
}

// 📌 Apply Text Changes
function applyTextEdit() {
    if (selectedText) {
        selectedText.content = textInput.value;
        selectedText.font = fontSelect.value;
        selectedText.size = parseInt(fontSize.value);
        selectedText.color = textColor.value;
        textEditor.classList.add("hidden");
        renderCanvas();
    }
}

// 📌 Save EEF File
function saveEEF() {
    const blob = new Blob([JSON.stringify(eefData, null, 4)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "edited.eef";
    a.click();
}
