const { Project } = require('../models')

class ProjectsController {
  index(event, data) {
    event.sender.webContents.send(
      '200 GET /projects',
      Project.all()
    )
  }

  create(event, data) {
    const project = new Project(data)
    project.save()
    event.sender.webContents.send(
      '200 POST /projects',
      {}
    )
  }
}

module.exports = ProjectsController
