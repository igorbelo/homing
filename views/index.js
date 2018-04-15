const electron = require('electron')
const ipc = electron.ipcRenderer
const remote = electron.remote
const BrowserWindow = remote.BrowserWindow
const path = require('path')
const url = require('url')
const rails = require('../lib/rails')

const openNewProjectWindow = () => {
  let modalWindow = new BrowserWindow({width: 500, height: 300, title: 'New Project', parent: remote.getCurrentWindow()})

  modalWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'new_project.html'),
    protocol: 'file:',
    slashes: true
  }))
  modalWindow.webContents.openDevTools()

  modalWindow.on('closed', () => {
    modalWindow = null
  })
}

jQuery('#newProject').on('click', (e) => {
  openNewProjectWindow()
})

jQuery(document).on('click', '.nav-link', (e) => {
  ipc.send('open-window', {file: 'show_project.html', params: {id: jQuery(e.target).data('id')}})
})

rails.request.send(ipc, 'GET /projects')
rails.response.handle(ipc, '200 GET /projects', (_event, data) => {
  const projectsList = jQuery("#projects-list")
  projectsList.html('')
  data.forEach((project) => {
    projectsList.append('<li class="nav-item"><a class="nav-link" href="#" data-id="'+project.attributes['_id']+'">'+project.attributes['title']+'</a></li>')
  })
})

ipc.on('flash-message', (event, message) => {
  jQuery('#flash-message').html(message)
})

ipc.on('project-created', (_event, _data) => {
  rails.request.send(ipc, 'GET /projects')
})
