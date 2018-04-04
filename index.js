const electron = require('electron')
const remote = electron.remote
const app = remote.app
const dialog = remote.dialog
const BrowserWindow = remote.BrowserWindow
const path = require('path')
const url = require('url')

const newProjectButton = document.getElementById('newProject')

const openNewProjectWindow = () => {
  let mainWindow = new BrowserWindow({width: 500, height: 300, title: 'New Project'})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'new_project.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

newProjectButton.onclick = (e) => {
  openNewProjectWindow()
}
