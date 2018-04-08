function Project() {}

Project.prototype.all = (options = {}) => {
  return [{id: 10}, {id: 20}]
}

module.exports = Project
