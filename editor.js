const editor = document.getElementById("editor");
const fileInput = document.getElementById("fileInput");

// 📌 Load EEF File (Supports Your Structure)
fileInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const rawData = e.target.result;
            console.log("Raw JSON Data:", rawData); // Debugging log
            const data = JSON.parse(rawData);

            // Check if pages exist
            if (data.pages && Array.isArray(data.pages) && data.pages.length > 0) {
                let pageContent = "";

                // Loop through all pages and extract text elements
                data.pages.forEach(page => {
                    if (page.elements && Array.isArray(page.elements)) {
                        page.elements.forEach(element => {
                            if (element.type === "text" && element.content) {
                                pageContent += `<p style="font-family: ${element.font}; font-size: ${element.size}px; color: ${element.color};">${element.content}</p>`;
                            }
                        });
                    }
                });

                editor.innerHTML = pageContent;
                console.log("EEF File Loaded Successfully!");
            } else {
                throw new Error("Invalid EEF format: No pages or elements found.");
            }
        } catch (error) {
            alert("Error: Invalid EEF file format. Please check your structure.");
            console.error("File Load Error:", error);
        }
    };
    reader.readAsText(file);
});

// 📌 Save EEF File (Keeps Your Structure)
function saveEEF() {
    let elements = [];

    // Extract all text elements from the editor
    editor.childNodes.forEach(child => {
        if (child.tagName === "P") {
            elements.push({
                type: "text",
                content: child.innerText,
                x: 50, // Default position (can be improved)
                y: 100,
                font: getComputedStyle(child).fontFamily,
                size: parseInt(getComputedStyle(child).fontSize),
                color: getComputedStyle(child).color
            });
        }
    });

    // Create the new EEF structure
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

// 📌 Enable Rich Text Editing (Word-like Features)
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey) {
        switch (event.key.toLowerCase()) {
            case "b":
                document.execCommand("bold");
                event.preventDefault();
                break;
            case "i":
                document.execCommand("italic");
                event.preventDefault();
                break;
            case "u":
                document.execCommand("underline");
                event.preventDefault();
                break;
        }
    }
});
