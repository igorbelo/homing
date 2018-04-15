const electron = require('electron')
const rails = require('../lib/rails')
const ipc = electron.ipcRenderer

const newProjectForm = jQuery('#newProject')

newProjectForm.on('submit', (_event) => {
  const formData = newProjectForm.serializeArray()
  const data = {}
  formData.push({name: 'directory', value: newProjectForm.find('#directory').prop('files')[0].path})
  formData.forEach((elem) => data[elem.name] = elem.value)
  rails.request.send(ipc, 'POST /projects', data)
})

rails.response.handle(ipc, '200 POST /projects', (_event, data) => {
  electron.remote.getCurrentWindow().getParentWindow().webContents.send('flash-message', 'Success Message')
  electron.remote.getCurrentWindow().getParentWindow().webContents.send('project-created')
  electron.remote.getCurrentWindow().close()
})
