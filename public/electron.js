/* eslint-disable import/no-extraneous-dependencies */
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
require('electron-reload')(__dirname);
const path = require('path');

let mainWin;

function createWindow() {
  // Create the window
  mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load main html file
  mainWin.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  mainWin.on('close', () => {
    mainWin = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWin == null) {
    createWindow();
  }
});
