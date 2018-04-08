const electron = require('electron')
const { createRoutes } = require('./config/routes')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const dialog = electron.dialog

const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({show: false})
  mainWindow.maximize()

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.webContents.openDevTools()
  mainWindow.show()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

createRoutes(ipc)
