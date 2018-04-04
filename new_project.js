const electron = require('electron')
const ipc = electron.ipcRenderer

const formDataToJsonString = (formData) => {
  const object = {}
  formData.forEach((value, key) => {
    object[key] = value
  })
  return JSON.stringify(object)
}

const newProjectForm = document.getElementById('newProject')

newProjectForm.onsubmit = (event) => {
  ipc.send('POST /projects', formDataToJsonString(new FormData(newProjectForm)))
}

ipc.on('200 POST /projects', (event, _data) => {
  electron.remote.getCurrentWindow().close()
})
