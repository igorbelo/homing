const _formDataToJsonString = (formData) => {
  const object = {}
  formData.forEach((value, key) => {
    object[key] = value
  })
  return JSON.stringify(object)
}

const sendForm = (ipc, route, form) => {
  send(ipc, route, _formDataToJsonString(new FormData(form)))
}

const send = (ipc, route, data = {}) => {
  ipc.send(route, data)
}

module.exports = {
  send: send,
  sendForm: sendForm
}
