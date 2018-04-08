const electron = require('electron')
const ipc = electron.ipcRenderer
const remote = electron.remote
const app = remote.app
const dialog = remote.dialog
const BrowserWindow = remote.BrowserWindow
const path = require('path')
const url = require('url')
const rails = require('../lib/rails')

const newProjectButton = document.getElementById('newProject')

const openNewProjectWindow = () => {
  let mainWindow = new BrowserWindow({width: 500, height: 300, title: 'New Project', parent: remote.getCurrentWindow(), modal: true})

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

rails.request.send(ipc, 'GET /projects')
rails.response.handle(ipc, '200 GET /projects', (_event, data) => {
  document.getElementById('projects-list').innerHTML = data.toString()
})

ipc.on('flash-message', (event, message) => {
  document.getElementById('flash-message').innerHTML = message
})
