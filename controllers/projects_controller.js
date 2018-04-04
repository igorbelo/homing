function ProjectsController() {}

ProjectsController.prototype.create = (data) => {
  return {channel: '200 POST /projects', data: {}}
}

module.exports = ProjectsController
