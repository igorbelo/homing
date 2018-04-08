const handle = (ipc, channel, fn) => {
  ipc.on(channel, fn)
}

module.exports = {
  handle: handle
}
