const { projectsController } = require('../controllers')

const newRoute = (ipc, route, fn) => {
  ipc.on(route, (event, data) => {
    fn(event, JSON.parse(data))
  })
}

module.exports = {
  createRoutes: (ipc) => {
    newRoute(ipc, 'POST /projects', projectsController.create)
  }
}
