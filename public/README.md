# public/

This directory includes files affecting the layout of the program.

## [`electron.js`](electron.js)
This file creates the program window, defining the default window
height and width, and telling the program where to load the content
of the window from.

## [`favicon.ico`](favicon.ico)
This file contains the application icon. It is currently not in use,
and it only contains the default icon.

## [`index.html`](index.html)
This is the main HTML file. It does not contain any actual page content;
instead, when React compiles the React component files to HTML, React
automatically inserts them into this file.

## [`manifest.json`](manifest.json)
Defines some configuration for React, this file has not been modified from
the default.