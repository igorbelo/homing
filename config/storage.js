const Storage = require('../lib/rails').storage

const APP_STRING = "aposkdaopskdpoasjfoiahriuahwiejpaowjdopskpoajdf"
const APP_KEY = Symbol.for(APP_STRING)

const globalSymbols = Object.getOwnPropertySymbols(global);
const hasKey = (globalSymbols.indexOf(APP_KEY) > -1);

if (!hasKey) {
  global[APP_KEY] = new Storage({configName: APP_STRING})
}

module.exports = global[APP_KEY]
