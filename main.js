const path = require('path');
const { app, BrowserWindow, Menu, screen } = require('electron');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const APP_TITLE = 'Riftbound Arena';

function createWindow() {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const width = Math.min(1640, screenWidth);
  const height = Math.min(1130, screenHeight);

  const win = new BrowserWindow({
    width,
    height,
    minWidth: 1280,
    minHeight: 800,
    title: APP_TITLE,
    backgroundColor: '#070a12',
    show: false,
    fullscreenable: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  Menu.setApplicationMenu(null);
  win.once('ready-to-show', () => win.show());
  win.loadFile(path.join(__dirname, 'index.html'));

  if (!app.isPackaged) {
    win.webContents.on('before-input-event', (event, input) => {
      const key = String(input.key || '').toLowerCase();
      if (input.control && input.shift && key === 'i') {
        win.webContents.openDevTools({ mode: 'detach' });
      }
    });
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
