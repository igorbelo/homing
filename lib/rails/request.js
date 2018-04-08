const _formDataToJsonString = (formData) => {
  const object = {}
  formData.forEach((value, key) => {
    object[key] = value
  })
  return JSON.stringify(object)
}

const sendForm = (ipc, channel, form) => {
  ipc.send(channel, _formDataToJsonString(new FormData(form)))
}

const send = (ipc, channel, data = {}) => {
  ipc.send(channel, JSON.stringify(data))
}

module.exports = {
  send: send,
  sendForm: sendForm
}
