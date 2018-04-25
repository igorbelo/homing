const electron = require('electron')
const rails = require('../lib/rails')
const ipc = electron.ipcRenderer

const editProjectForm = jQuery('#editProject')

editProjectForm.on('submit', (_event) => {
  const formData = editProjectForm.serializeArray()
  const data = {
    "_id": electron.remote.getCurrentWindow().getParentWindow().params.id
  }
  formData.push({name: 'directory', value: editProjectForm.find('#directory').prop('files')[0].path})
  formData.forEach((elem) => data[elem.name] = elem.value)
  rails.request.send(ipc, 'PUT /projects/:id', data)
})

rails.response.handle(ipc, '200 PUT /projects/:id', (_event, data) => {
  electron.remote.getCurrentWindow().getParentWindow().webContents.send('flash-message', 'Success Message')
  electron.remote.getCurrentWindow().getParentWindow().webContents.send('project-created')
  electron.remote.getCurrentWindow().close()
})
