import json

# Define basic EEF document structure
eef_data = {
    "meta": {
        "title": "The First EEF Document",
        "author": "God",
        "created": "2025-02-28"
    },
    "pages": [
        {
            "elements": [
                {
                    "type": "text",
                    "content": "Hello, EEF!",
                    "x": 50, "y": 100,
                    "font": "Arial",
                    "size": 14,
                    "bold": True,
                    "color": "#000000"
                }
            ]
        }
    ]
}

# Save to a file
with open("document.eef", "w") as file:
    json.dump(eef_data, file, indent=4)

print("EEF file 'document.eef' created successfully!")
