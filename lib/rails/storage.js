const electron = require('electron')
const path = require('path')
const fs = require('fs')

const _parseDataFile = (filePath, defaults) => {
  try {
    return JSON.parse(fs.readFileSync(filePath))
  } catch(error) {
    return defaults
  }
}

class Storage {
  constructor(opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData')
    this.path = path.join(userDataPath, opts.configName + '.json')
    this.data = _parseDataFile(this.path, (opts.defaults || {}))
  }

  get(key) {
    return this.data[key]
  }

  set(key, val) {
    this.data[key] = val
    this._write()
  }

  append(key, val) {
    let newValue
    if (this.data[key]) {
      newValue = this.data[key].concat(val)
    }
    else {
      newValue = [val]
    }
    this.set(key, newValue)
  }

  _write() {
    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }
}

module.exports = Storage
