const storage = require('../config/storage')

class Project {
  static all(options = {}) {
    // storage.set('projects-list', [{id: 1}, {id: 50}])
    return storage.get('projects-list')
  }
}

module.exports = Project
