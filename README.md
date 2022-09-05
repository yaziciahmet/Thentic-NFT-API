# Blockchain NFT Console Application

An application to create, mint, and transfer NFT's using Thentic API!

## Instal dependencies
- yarn

## General usage
- `node src/app.js <command> [args]` 

## Commands
- `config` -> Configure Thentic api key and the chain Id (for development 97 is suggested)
- `get-contracts` -> View your deployed contracts with your api key
- `get-nfts` -> View your minted NFT's with your api key
- `create-contract` -> Create an NFT smart contract. Required `--name <nftName> --shortName <nftShortName>`
- `mint-nft` -> Mint an NFT. Required `--contract <contractAddress> --nftId <id> --nftData <data> --to <nftContractOwnerAddress>`
- `transfer-nft` -> Transfer an NFT. Required  `--contract <contractAddress> --nftId <id> --from <ownerAddress> --to <transferAddress>`

## Example usage
`node src/app.js get-contracts`
`node src/app.js create-contract --name Monkeys --shortName MON`
`node src/app.js mint-nft --contract 0x... --nftId 0 --nftData BlueMonkey --to 0x...`