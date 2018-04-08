const newChannel = (ipc, channel, fn) => {
  ipc.on(channel, (event, data = {}) => {
    fn(event, JSON.parse(data))
  })
}

module.exports = {
  newChannel: newChannel
}
