const { Project } = require('../models')

class ProjectsController {
  index(event, data) {
    event.sender.webContents.send(
      '200 GET /projects',
      Project.all()
    )
  }

  show(event, data) {
    event.sender.webContents.send(
      '200 GET /projects/:id',
      Project.find(data.id)
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

  update(event, data) {
    const project = Project.find(data['_id'])
    project.save(data)
    event.sender.webContents.send(
      '200 PUT /projects/:id',
      {}
    )
  }

  delete(event, data) {
    Project.deleteAll({filter: (p) => p['_id'] == data['id']})
    event.sender.webContents.send(
      '200 DELETE /projects/:id',
      {}
    )
  }
}

module.exports = ProjectsController
