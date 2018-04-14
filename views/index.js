const electron = require('electron')
const ipc = electron.ipcRenderer
const remote = electron.remote
const BrowserWindow = remote.BrowserWindow
const path = require('path')
const url = require('url')
const rails = require('../lib/rails')

const openNewProjectWindow = () => {
  let modalWindow = new BrowserWindow({width: 500, height: 300, title: 'New Project', parent: remote.getCurrentWindow(), modal: true})

  modalWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'new_project.html'),
    protocol: 'file:',
    slashes: true
  }))
  modalWindow.webContents.openDevTools()

  modalWindow.on('closed', function () {
    modalWindow = null
  })
}

jQuery('#newProject').on('click', (e) => {
  openNewProjectWindow()
})

rails.request.send(ipc, 'GET /projects')
rails.response.handle(ipc, '200 GET /projects', (_event, data) => {
  const projectsList = jQuery("#projects-list")
  projectsList.html('')
  data.forEach((project) => {
    projectsList.append("<li>"+project.attributes['title']+"</li>")
  })
})

ipc.on('flash-message', (event, message) => {
  document.getElementById('flash-message').innerHTML = message
})

ipc.on('project-created', (_event, _data) => {
  rails.request.send(ipc, 'GET /projects')
})
