const electron = require('electron')
const { createChannels } = require('./config/channels')
const app = require('./application')
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

const path = require('path')
const url = require('url')

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({show: false})
  mainWindow.maximize()

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // mainWindow.webContents.openDevTools()
  mainWindow.show()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.electron.on('ready', createWindow)

app.electron.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.electron.quit()
  }
})

app.electron.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('open-window', (_event, data) => {
  mainWindow.params = data.params
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views', data.file),
    protocol: 'file:',
    slashes: true
  }))
})

createChannels(ipc)
