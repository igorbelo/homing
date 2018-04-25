const electron = require('electron')
const rails = require('../lib/rails')
const ipc = electron.ipcRenderer
const remote = electron.remote
const BrowserWindow = remote.BrowserWindow
const path = require('path')
const url = require('url')

let project = null
let project_id = electron.remote.getCurrentWindow().params.id
let modalWindow
const openEditProjectWindow = () => {
  modalWindow = new BrowserWindow({width: 500, height: 300, title: 'Edit Project - ' + project.attributes['title'], parent: remote.getCurrentWindow()})

  modalWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'edit_project.html'),
    protocol: 'file:',
    slashes: true
  }))
  // modalWindow.webContents.openDevTools()

  modalWindow.on('closed', () => {
    modalWindow = null
  })
}

jQuery('#goBack').on('click', () => {
  ipc.send('open-window', {file: 'index.html', params: {}})
})

jQuery('#editProject').on('click', () => {
  openEditProjectWindow()
})

jQuery('#deleteProject').on('click', () => {
  if (confirm('Are you sure you want to delete this project?')) {
    rails.request.send(ipc, 'DELETE /projects/:id', {id: project_id})
  }
})

rails.request.send(ipc, 'GET /projects/:id', {id: project_id})
rails.response.handle(ipc, '200 GET /projects/:id', (_event, data) => {
  project = data
  jQuery('h1').html(project.attributes['title'])
  jQuery('#description').html(project.attributes['description'])
})

rails.response.handle(ipc, '200 DELETE /projects/:id', (_event, data) => {
  ipc.send('open-window', {file: 'index.html', params: {}})
})
