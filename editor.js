let eefData = { pages: [{ elements: [] }] }; // Store EEF data
const canvas = document.getElementById("editorCanvas");
const ctx = canvas.getContext("2d");

//Load EEF File
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

//Render Text on Canvas
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

//Save EEF File
function saveEEF() {
    const blob = new Blob([JSON.stringify(eefData, null, 4)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "edited.eef";
    a.click();
}
