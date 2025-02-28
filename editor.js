let eefData = { pages: [{ elements: [] }] }; // Store EEF data
const canvas = document.getElementById("editorCanvas");
const ctx = canvas.getContext("2d");
let selectedText = null; // Track selected text for editing

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

// 📌 Detect Click on Text
canvas.addEventListener("click", function(event) {
    const x = event.offsetX, y = event.offsetY;

    eefData.pages[0].elements.forEach(element => {
        if (element.type === "text") {
            const textWidth = ctx.measureText(element.content).width;
            const textHeight = element.size; // Approximate height
            if (x >= element.x && x <= element.x + textWidth && y >= element.y - textHeight && y <= element.y) {
                selectedText = element;
                showEditBox(element);
            }
        }
    });
});

// 📌 Show Input Box for Editing
function showEditBox(element) {
    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.value = element.content;
    inputBox.style.position = "absolute";
    inputBox.style.left = `${canvas.offsetLeft + element.x}px`;
    inputBox.style.top = `${canvas.offsetTop + element.y}px`;
    inputBox.style.fontSize = `${element.size}px`;
    document.body.appendChild(inputBox);

    inputBox.focus();

    inputBox.addEventListener("blur", function() {
        element.content = inputBox.value;
        document.body.removeChild(inputBox);
        renderCanvas();
    });
}

// 📌 Save EEF File
function saveEEF() {
    const blob = new Blob([JSON.stringify(eefData, null, 4)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "edited.eef";
    a.click();
}
