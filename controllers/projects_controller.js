function ProjectsController() {}

ProjectsController.prototype.create = (event, data) => {
  const result = {channel: '200 POST /projects', data: {}}
  event.sender.webContents.send(result.channel, JSON.stringify(result.data))
}

module.exports = ProjectsController
