const app = require('../application')
const md5 = require('md5')

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

  static find(id) {
    const attributes = app.storage.get('projects-list').find(p => p['_id'] == id)
    return new Project(attributes)
  }

  save(replacements = false) {
    if (!this.isValid()) {
      return false
    }

    if (!replacements) {
      this.attributes['_id'] = md5(new Date() + this.attributes['title'])
      app.storage.append('projects-list', this.attributes)
    }
    else {
      const projects = Project.all()
      const modifiedProjects = projects.map((project) => {
        if (project.attributes['_id'] == replacements['_id']) {
          return replacements
        }
        else {
          return project.attributes
        }
      })
      app.storage.set('projects-list', modifiedProjects)
    }

    return true
  }

  isValid() {
    //make some validation
    return true
  }
}

module.exports = Project
