# EEF

## Overview
EEF (Easily Editable File) is a custom file format designed for creating and editing documents with rich text and images. This project consists of a Python script (`eef.py`) for creating an EEF file, a JavaScript file (`editor.js`) for editing the EEF file in a web interface, and an HTML file (`index.html`) for rendering the editor. The editor allows users to apply formatting, add images, and save or load EEF documents.

## File Structure

1. **eef.py**: A Python script that creates an EEF file (`document.eef`) with a basic structure containing metadata and content (text in this case).
2. **editor.js**: JavaScript to handle the editing and formatting of the document, including inserting text, changing fonts, colors, adding images, and saving the document back to an EEF file.
3. **index.html**: A simple HTML file that provides the interface for users to interact with the EEF editor (e.g., inserting text and images, applying formatting, and saving/loading EEF files).

## Features

### 1. **Create EEF File** (via Python script)
- The `eef.py` script generates an EEF file with a basic structure that includes document metadata (title, author, creation date) and content (a simple text element with formatting properties).

### 2. **Edit EEF File** (via JavaScript Editor)
- The `editor.js` file provides functionalities for:
  - **Text Formatting**: Bold, Italic, Underline, Font Style, Font Size, Text Color.
  - **Insert Image**: Allows users to upload an image and drag it to the desired position.
  - **Load EEF File**: Users can upload an existing EEF file and edit its content directly in the editor.
  - **Save EEF File**: After editing, the document can be saved back in the EEF format.

### 3. **Editable Document**
- The editor allows for free text editing, formatting (font, size, color), and placing images directly in the document.
  
### 4. **File Handling**
- Load an EEF file into the editor by selecting it through an input field.
- Save the modified document as a new EEF file with updated content.

## Installation

1. **Clone or Download the Project**:
   - Clone or download the files `eef.py`, `editor.js`, and `index.html` to your local machine.

2. **Run the Python Script** (`eef.py`) to Generate an Initial EEF File:
   - Ensure you have Python installed on your machine.
   - Run the following command in your terminal:
     ```bash
     python eef.py
     ```
   - This will generate an `document.eef` file with an example document structure.

3. **Open the HTML File**:
   - Open `index.html` in any web browser to start using the EEF editor.
   - The interface will allow you to edit text, change fonts, add images, and save or load EEF files.

## Usage

### 1. **Creating an EEF File (via Python)**

The `eef.py` script creates an EEF document with the following structure:

- **Meta**: Contains document metadata such as the title, author, and creation date.
- **Pages**: A list of pages in the document, each containing a list of elements (e.g., text, images).

Here is a simple example of the document structure generated by `eef.py`:

```json
{
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
                    "x": 50,
                    "y": 100,
                    "font": "Arial",
                    "size": 14,
                    "bold": true,
                    "color": "#000000"
                }
            ]
        }
    ]
}
```

### 2. **Using the Editor (index.html)**

Once the Python script generates an EEF file, follow these steps to use the editor:

1. **Text Formatting**:
   - Use the toolbar to apply text formatting such as **bold**, **italic**, **underline**, font selection, and color picking.

2. **Insert Image**:
   - Upload images through the file input, which will be displayed within the editor. You can also drag and position them as needed.

3. **Save the Document**:
   - After editing, click "Save EEF" to download the updated document in EEF format.

4. **Load an Existing EEF File**:
   - Use the "Choose File" input to load an existing EEF file and begin editing it.

### 3. **Saving the EEF File**

After editing the document in the web editor, the changes can be saved using the "Save EEF" button. The `editor.js` file will generate the content based on the user's edits and package it into a valid EEF file, which can be downloaded.

---

## Conclusion

This project provides an easy-to-use interface for creating, editing, and saving documents in the EEF format. The Python script (`eef.py`) allows for simple document creation, while the web interface (using `editor.js` and `index.html`) gives users the tools they need to customize and modify the document content.
