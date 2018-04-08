const handle = (ipc, route, fn) => {
  ipc.on('200 POST /projects', fn)
}

module.exports = {
  handle: handle
}
