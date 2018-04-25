const { projectsController } = require('../controllers')
const { newChannel } = require('../lib/rails').channels

module.exports = {
  createChannels: (ipc) => {
    newChannel(ipc, 'GET /projects', projectsController.index)
    newChannel(ipc, 'GET /projects/:id', projectsController.show)
    newChannel(ipc, 'POST /projects', projectsController.create)
    newChannel(ipc, 'PUT /projects/:id', projectsController.update)
    newChannel(ipc, 'DELETE /projects/:id', projectsController.delete)
  }
}
