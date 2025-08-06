import { app, BrowserWindow } from 'electron';

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "AirGap Wallet",
    backgroundColor: "#00000000",
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#00000000',
      symbolColor: '#333333',
      height: 24
    },
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: false,
    }
  });

  win.loadURL('https://wallet.airgap.it');

  win.setMenu(null);

  win.webContents.on('did-finish-load', () => {
    win!.webContents.insertCSS(`
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 24px;
        background: transparent;
        -webkit-app-region: drag;
        z-index: 9999;
        pointer-events: none;
      }

      body {
        margin-top: 0px !important;
      }
    `);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
