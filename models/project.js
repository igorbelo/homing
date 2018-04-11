const app = require('../application')

class Project {
  static all(options = {}) {
    // storage.set('projects-list', [{id: 1}, {id: 50}])
    return app.storage.get('projects-list')
  }
}

module.exports = Project
