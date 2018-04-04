const { projectsController } = require('./controllers')

module.exports = {
  createRoutes: (ipc) => {
    ipc.on('POST /projects', (event, data) => {
      const result = projectsController.create(JSON.parse(data))
      event.sender.webContents.send(result.channel, JSON.stringify(result.data))
    })
  }
}
