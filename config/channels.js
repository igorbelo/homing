const { projectsController } = require('../controllers')
const rails = require('../lib/rails')

module.exports = {
  createChannels: (ipc) => {
    rails.newChannel(ipc, 'GET /projects', projectsController.index)
    rails.newChannel(ipc, 'POST /projects', projectsController.create)
  }
}
