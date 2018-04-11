const { Storage, Application } = require('./lib/rails')
const APP_STRING = "aposkdaopskdpoasjfoiahriuahwiejpaowjdopskpoajdf"
const APP_KEY = Symbol.for(APP_STRING)
const globalSymbols = Object.getOwnPropertySymbols(global)
const hasKey = (globalSymbols.indexOf(APP_KEY) > -1)

if (!hasKey) {
  const storage = new Storage({ configName: APP_STRING })
  global[APP_KEY] = new Application({ storage: storage, key: APP_STRING })
}

module.exports = global[APP_KEY]
