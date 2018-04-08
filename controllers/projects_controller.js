const { Project } = require('../models')

function ProjectsController() {}

ProjectsController.prototype.index = (event, data) => {
  const projectModel = new Project()
  const result = {channel: '200 GET /projects', data: projectModel.all()}
  event.sender.webContents.send(result.channel, JSON.stringify(result.data))
}

ProjectsController.prototype.create = (event, data) => {
  const result = {channel: '200 POST /projects', data: {}}
  event.sender.webContents.send(result.channel, JSON.stringify(result.data))
}

module.exports = ProjectsController
