# Decentralized Star Notary

To build ba smart contract, create a notary service, and deploy it on public testnet of Ethereum blockchain.

More details: [Project rubrics](https://review.udacity.com/#!/rubrics/2297/view "Title")

```
koukintous-MacBook-Pro:smart_contracts huangjintao$ truffle migrate --network rinkeby --reset --compile-all
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/StarNotary.sol...
Compiling ./node_modules/openzeppelin-solidity/contracts/introspection/ERC165.sol...
Compiling ./node_modules/openzeppelin-solidity/contracts/introspection/IERC165.sol...
Compiling ./node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol...
Compiling ./node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol...
Compiling ./node_modules/openzeppelin-solidity/contracts/token/ERC721/IERC721.sol...
Compiling ./node_modules/openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol...
Compiling ./node_modules/openzeppelin-solidity/contracts/utils/Address.sol...
Writing artifacts to ./build/contracts

Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0xe7496a96b2d3a92bbec9bb016c34c0dcb8601ee890218914f3950124b5e3f880
  Migrations: 0x79d3a42624e22083dd92742b9f40582b811c4253
Saving successful migration to network...
  ... 0xd64484e3795237f3bc1ce7e7ba6d44efc3cb11be216f59fae645f76c23b0b617
Saving artifacts...
```
## Contract address
0x79d3a42624e22083dd92742b9f40582b811c4253
https://rinkeby.etherscan.io/address/0x79d3a42624e22083dd92742b9f40582b811c4253

## Contract hash
0xe7496a96b2d3a92bbec9bb016c34c0dcb8601ee890218914f3950124b5e3f880
https://rinkeby.etherscan.io/tx/0xe7496a96b2d3a92bbec9bb016c34c0dcb8601ee890218914f3950124b5e3f880

## Transaction hash
0x66239825a533ee20b354e875b82dca6edbb165cfe1444375ab1bd47666d42320

History problem: 
when deploying with the function of createStar() in Remix using:
["Star power 103!", "I love my wonderful star", "ra_032.155", "dec_121.874", "mag_245.978", 1],
it always show "VM Exception while processing transaction: revert".

## TokenId
1

## PutStarUpForSale hash
