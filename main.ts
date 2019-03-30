import {app, BrowserWindow, screen, Menu, ipcMain} from 'electron';
import * as path from 'path';
import * as url from 'url';
import {Store} from './src/app/model/UserDataKeys';
const Store = require('electron-store');
let win;
const args = process.argv.slice(1);
export const serve = args.some(val => val === '--serve');

function createdMenu() {
  // Create the Application's main menu
  const application = {
    label: 'Application',
    submenu: [
      {
        label: 'About Application',
        selector: 'orderFrontStandardAboutPanel:'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => {
          app.quit();
        }
      }
    ]
  };

  const edit = {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        selector: 'redo:'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectAll:'
      }
    ]
  };

  const menus = [
    application,
    edit
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
}

function createWindow() {
  const store: Store = new Store();
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
// Create the browser window.
  win = new BrowserWindow({
    width: 800,
    center: true,
    height: 800,
    resizable: false,
    webPreferences: {
      webSecurity: false
    }
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  // win.webContents.openDevTools();

// Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

function openDetailWindow(veid: string, key: string, name: string) {
  const detailwin = new BrowserWindow({
    width: 800,
    height: 800,
    center: true,
    transparent: false,
    resizable: false,
    webPreferences: {
      webSecurity: false
    }
  });
  if (serve) {
    detailwin.loadURL(`http://localhost:4200/index.html#/detail?veid=${veid}&name=${name}&key=${key}`);
  } else {
    detailwin.loadURL(`file://${__dirname}/dist/index.html#/detail?veid=${veid}&name=${name}&key=${key}`);
  }
  // detailwin.webContents.openDevTools();
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    createWindow();
    createdMenu();
  });
  ipcMain.on('request-detail', (event, arg) => {
    console.log(arg);
    openDetailWindow(arg.veid, arg.key, arg.name);
  });
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
