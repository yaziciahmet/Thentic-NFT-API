const config = require('./cache/config.json')
const fs = require('fs')


function getConfig() {
  return config
}


function saveConfig(apiKey, chainId) {
  config.apiKey = apiKey
  config.chainId = chainId

  fs.writeFileSync(`${__dirname}/cache/config.json`, JSON.stringify(config, null, 2))
}


function isValidConfig() {
  return config.apiKey !== null && config.apiKey !== undefined && config.apiKey !== ''
    && config.chainId !== null && config.chainId !== undefined && config.chainId !== ''
}


function requireValidConfig() {
  if (!isValidConfig()) {
    console.log('Configuration is not set. Set it with:  node src/app.js config')
    process.exit()
  }

  return config
}


module.exports = {
  getConfig,
  saveConfig,
  requireValidConfig
}