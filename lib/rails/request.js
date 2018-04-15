const send = (ipc, channel, data = []) => {
  ipc.send(channel, JSON.stringify(data))
}

module.exports = {
  send: send
}
