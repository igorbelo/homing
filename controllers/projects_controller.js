const { Project } = require('../models')

class ProjectsController {
  index(event, data) {
    const result = {channel: '200 GET /projects', data: Project.all()}
    event.sender.webContents.send(result.channel, JSON.stringify(result.data))
  }

  create(event, data) {
    const result = {channel: '200 POST /projects', data: {}}
    event.sender.webContents.send(result.channel, JSON.stringify(result.data))
  }
}

module.exports = ProjectsController
