const electron = require('electron')
const rails = require('../lib/rails')
const ipc = electron.ipcRenderer

const newProjectForm = document.getElementById('newProject')

newProjectForm.onsubmit = (_event) => {
  rails.request.sendForm(ipc, 'POST /projects', newProjectForm)
}

rails.response.handle(ipc, '200 POST /projects', (_event, data) => {
  electron.remote.getCurrentWindow().getParentWindow().webContents.send('flash-message', 'Success Message')
  electron.remote.getCurrentWindow().getParentWindow().webContents.send('project-created')
  electron.remote.getCurrentWindow().close()
})
