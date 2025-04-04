const editor = document.getElementById("editor");
const fileInput = document.getElementById("fileInput");
const imageInput = document.getElementById("imageInput");
const fontSelector = document.getElementById("fontSelector");
const fontSizeSelector = document.getElementById("fontSizeSelector");
const colorPicker = document.getElementById("colorPicker");

// 📌 Apply Font Style
fontSelector.addEventListener("change", function() {
    document.execCommand("fontName", false, fontSelector.value);
});

// 📌 Apply Font Size
fontSizeSelector.addEventListener("change", function() {
    document.execCommand("fontSize", false, "7");
    let fontElements = document.getElementsByTagName("font");
    for (let i = 0; i < fontElements.length; i++) {
        if (fontElements[i].size === "7") {
            fontElements[i].removeAttribute("size");
            fontElements[i].style.fontSize = fontSizeSelector.value;
        }
    }
});

// 📌 Apply Text Color
colorPicker.addEventListener("input", function() {
    document.execCommand("foreColor", false, colorPicker.value);
});

// 📌 Insert Image into Editor
imageInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.maxWidth = "200px"; // Default size
        img.style.cursor = "move";

        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");
        imgContainer.style.position = "absolute";
        imgContainer.style.left = "50px";
        imgContainer.style.top = "50px";
        imgContainer.appendChild(img);

        // Enable dragging
        imgContainer.onmousedown = function(event) {
            event.preventDefault();
            let shiftX = event.clientX - imgContainer.getBoundingClientRect().left;
            let shiftY = event.clientY - imgContainer.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                imgContainer.style.left = pageX - shiftX + "px";
                imgContainer.style.top = pageY - shiftY + "px";
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener("mousemove", onMouseMove);

            imgContainer.onmouseup = function() {
                document.removeEventListener("mousemove", onMouseMove);
                imgContainer.onmouseup = null;
            };
        };

        editor.appendChild(imgContainer);
    };
    reader.readAsDataURL(file);
});

// 📌 Load EEF File
fileInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const rawData = e.target.result;
            const data = JSON.parse(rawData);

            if (data.pages && Array.isArray(data.pages)) {
                let pageContent = "";

                data.pages.forEach(page => {
                    if (page.elements && Array.isArray(page.elements)) {
                        page.elements.forEach(element => {
                            if (element.type === "text") {
                                pageContent += `<p style="font-family: ${element.font}; font-size: ${element.size}px; color: ${element.color};">${element.content}</p>`;
                            } else if (element.type === "image") {
                                pageContent += `<div class="image-container" style="position: absolute; left: ${element.x}px; top: ${element.y}px;">
                                                    <img src="${element.src}" style="max-width: 200px; cursor: move;">
                                                </div>`;
                            }
                        });
                    }
                });

                editor.innerHTML = pageContent;
            } else {
                throw new Error("Invalid EEF format: No pages or elements found.");
            }
        } catch (error) {
            alert("Error: Invalid EEF file format.");
        }
    };
    reader.readAsText(file);
});

// 📌 Save EEF File
function saveEEF() {
    let elements = [];

    editor.childNodes.forEach(child => {
        if (child.tagName === "P") {
            elements.push({
                type: "text",
                content: child.innerText,
                x: 50,
                y: 100,
                font: getComputedStyle(child).fontFamily,
                size: parseInt(getComputedStyle(child).fontSize),
                color: getComputedStyle(child).color
            });
        } else if (child.classList.contains("image-container")) {
            let img = child.querySelector("img");
            elements.push({
                type: "image",
                src: img.src,
                x: parseInt(child.style.left),
                y: parseInt(child.style.top)
            });
        }
    });

    const eefData = {
        meta: { title: "EEF Edited", author: "User", created: new Date().toISOString().split("T")[0] },
        pages: [{ elements }]
    };

    const blob = new Blob([JSON.stringify(eefData, null, 4)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "edited.eef";
    a.click();
}
