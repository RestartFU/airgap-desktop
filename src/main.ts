import { app, BrowserWindow } from 'electron';

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    title: "AirGap Wallet",
    backgroundColor: "#201c1c",
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: "#201c1c",
      symbolColor: "#ffffff",
      height: 30
    },
    webPreferences: {
      contextIsolation: true,
    }
  });

  // Remove default menu
  win.setMenu(null);

  // Load AirGap wallet website
  win.loadURL('https://wallet.airgap.it');

  // Inject CSS to create a draggable area at top
  win.webContents.on('did-finish-load', () => {
    win!.webContents.insertCSS(`
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 30px;
        -webkit-app-region: drag;
        z-index: 9999999;
        pointer-events: auto;
      }
    `);

    win!.show();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
