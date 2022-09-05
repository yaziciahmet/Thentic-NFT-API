const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const Axios = require('axios')
const axios = Axios.create({
  baseURL: 'https://thentic.tech/api/',
  headers: { 'Content-Type': 'application/json' }
})

const { saveConfig, requireValidConfig } = require('./config')


function setConfig() {
  return new Promise((resolve) => {
    rl.question('Enter your Thentic API Key: (If you don\'t have one, get it from https://thentic.tech/api/key)\n', (apiKey) => {
      rl.question('\nEnter the chain ID: (Check available chains at https://thentic.gitbook.io/api-docs/supported-blockchains)\n', (chainId) => {
        saveConfig(apiKey, chainId)
        console.log('\nConfiguration saved successfully.\n')
        rl.close()
        resolve()
      })
    })
  })
}


function createNFTContract(args) {
  return new Promise((resolve, reject) => {
    const { name, shortName } = args

    const config = requireValidConfig()

    const data = {
      key: config.apiKey,
      chain_id: config.chainId,
      name, 
      short_name: shortName
    }

    axios.post('nfts/contract', data)
      .then((res) => {
        console.log(`\nVisit '${res.data.transaction_url}' to initiate the deployment transaction with your Metamask account\n`)
        resolve()
      })
      .catch((err) => {
        reject(err)
      })

  })
}


function mintNFT(args) {
  return new Promise((resolve, reject) => {
    const { contract, nftId, nftData, to } = args

    const config = requireValidConfig()

    const data = {
      key: config.apiKey,
      chain_id: config.chainId,
      contract,
      nft_id: nftId,
      nft_data: nftData,
      to
    }

    axios.post('nfts/mint', data)
      .then((res) => {
        console.log(`\nVisit '${res.data.transaction_url}' to initiate the mint transaction with your Metamask account\n`)
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}


function getNFTContracts() {
  return new Promise((resolve, reject) => {
    const config = requireValidConfig()

    axios.get(`contracts?key=${config.apiKey}&chain_id=${config.chainId}`)
      .then((res) => {
        console.log(res.data)
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}


function getNFTs() {
  return new Promise((resolve, reject) => {
    const config = requireValidConfig()

    axios.get(`nfts?key=${config.apiKey}&chain_id=${config.chainId}`)
      .then((res) => {
        console.log(res.data)
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}


function transferNFT(args) {
  return new Promise((resolve, reject) => {
    const { contract, nftId, from, to } = args
    
    const config = requireValidConfig()

    const data = {
      key: config.apiKey,
      chain_id: config.chainId,
      contract,
      nft_id: nftId,
      from,
      to
    }

    axios.post('nfts/transfer', data)
      .then((res) => {
        console.log(`\nVisit '${res.data.transaction_url}' to initiate the transfer transaction with your Metamask account\n`)
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}


module.exports = {
  setConfig,
  createNFTContract,
  mintNFT,
  getNFTContracts,
  getNFTs,
  transferNFT
}