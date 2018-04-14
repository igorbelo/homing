const app = require('../application')

class Project {
  constructor(attributes = {}) {
    this.attributes = attributes
  }

  static all(options = {}) {
    return (app.storage.get('projects-list') || []).map(attributes => new Project(attributes))
  }

  static deleteAll(options = {}) {
    app.storage.delete('projects-list')
  }

  save() {
    if (!this.isValid()) {
      return false
    }

    app.storage.append('projects-list', this.attributes)
    return true
  }

  isValid() {
    //make some validation
    return true
  }
}

module.exports = Project
