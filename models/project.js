const app = require('../application')

class Project {
  constructor(attributes = {}) {
    this.attributes = attributes
  }

  static all(options = {}) {
    return (app.storage.get('projects-list') || []).map(attributes => new Project(attributes))
  }

  static deleteAll(options = {}) {
    if (!options.filter) {
      app.storage.set('projects-list', [])
    }
    else {
      const projects = app.storage.get('projects-list')
      const deletedProjects = projects.filter(options.filter)

      app.storage.set('projects-list', projects.filter(p => !deletedProjects.includes(p)))
    }
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
