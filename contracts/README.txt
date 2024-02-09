# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```



Contract:
-ERC721-A Contract
-Normal Mint and Whitelist Mint option
-Burning functionality
-Obviously baseURI and other standard options.

Whitelist:

    There are 100+(This can change) unique wallet for the whitelist.
    Important part is that some of the wallet have different whitelist mint count then others.
    So let's say first wallet have 3 whitelist mint, second wallet could have 2 WL mint and maybe third wallet have 9 WL mint chance and so on...
    So we need to specify which wallet have how many WL mint.
    
    Whitelist mints are free, so if a wallet have let's say 8 WL mint chance they should be able to mint 8 WL mint for free.
    After 8, it'll be normal mint.

Front End on dApp:

-There should be 2 options, normal mint and whitelist mint,
-If they choose whitelist mint, then they should be able to see how much quantity they have. If they have 4 WL mint then they should be able to see it and proceed to mint those 4.
-Normal mint is just as usual.
