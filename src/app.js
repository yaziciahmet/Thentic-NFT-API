if (process.argv.length < 3) {
  console.log('Usage:  node src/app.js <command> [args]')
  process.exit()
}

const { setConfig, getNFTContracts, getNFTs, createNFTContract, mintNFT, transferNFT } = require('./commands')
const commands = {
  'config': {
    exec: setConfig,
    options: []
  },
  'get-contracts': {
    exec: getNFTContracts,
    options: []
  },
  'get-nfts': {
    exec: getNFTs,
    options: []
  },
  'create-contract': {
    exec: createNFTContract,
    options: ['name', 'shortName']
  },
  'mint-nft': {
    exec: mintNFT,
    options: ['contract', 'nftId', 'nftData', 'to']
  },
  'transfer-nft': {
    exec: transferNFT,
    options: ['contract', 'nftId', 'from', 'to']
  }
}

const command = process.argv[2]
const func = commands[command]

if (func) {
  const args = parseCommandArgs(func.options)

  func.exec(args)
    .then(() => process.exit())
    .catch((err) => {
      console.log('An error occurred while processing your request, please check your arguments, and/or try again.')
      process.exit()
    })
} else {
  console.log(`Unknown command ${command}`)
  process.exit()
}



function parseCommandArgs(options) {
  let args = {}

  options.forEach((option) => {
    const idx = process.argv.findIndex((arg) => arg === '--' + option)

    if (idx === -1) {
      console.log(wrongArgsMessage(options))
      process.exit()
    }

    args[option] = process.argv[idx + 1]
  })

  return args
}


function wrongArgsMessage(options) {
  let msg = `Wrong arguments. Usage:  node src/app.js ${command}`
  
  options.forEach((option) => {
    msg += ` --${option} ...`
  })

  return msg
}