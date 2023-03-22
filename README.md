# stickyNotes

Implements a dashboard with editable sticky notes.

## Architecture

This project was developed with React.js and TypeScript.

In the src directory there are four subdirectories:

- components: Here lives the fragments of the application.
- hooks: Store specific functionality that does not require being rendered by itself.
- models: Store interfaces.
- pages: Store the dashboard page where live all the SPA.

The main component is called StickyNote, and has his own structure:

- components: Small pieces of code that live better and more organized inside StickyNote
- helpers: Small utilities used across the component.

## How to run

To run this project it is only necessary to install the node packages with npm install, and then execute the project with npm start.

## How to use

- Clicking the buttons labeled "Add" + color will agregate a sticky note of that specific color, appearing in the top-left corner of the screen.

- Each sticky note can be dragged anywhere on the screen, placing the dragged note on top of the rest.

- Double clicking on each sticky note activate its editing mode, where it is possible to add text and change the size. To escape this editing mode, first focus the cursor on the text prompt inside the sticky note, and then trigger a blur event where the focus is lost.

- The status of all the sticky notes will be automatically saved to local storage. You can save using the backend API by clicking the "SAVE" button (mocked service).

- To delete a sticky note, drag and drop it over the "TRASH" area in the bottom-right corner.
