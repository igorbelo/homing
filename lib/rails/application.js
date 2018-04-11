const electron = require('electron')

class Application {
  constructor(opts) {
    this.storage = opts.storage
    this.key = opts.key
    this.electron = electron.app
  }
}

module.exports = Application
