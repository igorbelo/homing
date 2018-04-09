const { projectsController } = require('../controllers')
const { newChannel } = require('../lib/rails').channels

module.exports = {
  createChannels: (ipc) => {
    newChannel(ipc, 'GET /projects', projectsController.index)
    newChannel(ipc, 'POST /projects', projectsController.create)
  }
}
