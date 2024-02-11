// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract X0giesA is ERC721A, Ownable {
    // uint256 private _nextTokenId();

    constructor() ERC721A("X0giesA", "X0G") {
        MAX_SUPPLY = 4444;
        MAX_MINT_PER_TX = 10;
        PUBLIC_MINT_PRICE = 0.004 ether;
    }

    uint256 public MAX_SUPPLY;
    uint256 public MAX_MINT_PER_TX;
    uint256 public PUBLIC_MINT_PRICE;

    string private _baseTokenURI;

    //How many NFTs are allowed to mint Per Wallet Address
    mapping(address => uint256) public whitelistMints;

    //How many NFTs are claimed/transferred by an Address
    mapping(address => uint256) public claimedWhitelistTokens;

    function publicMinting(uint256 _noOfMints) external payable {
        require(
            msg.value == PUBLIC_MINT_PRICE * _noOfMints,
            "Insufficient ETH sent"
        );
        require(
            _noOfMints <= MAX_MINT_PER_TX,
            "Exceeds maximum mint per transaction"
        );
        _mint(_msgSender(), _noOfMints);
    }

    function whitelistedMinting(uint256 _noOfMints) external payable {
        require(whitelistMints[_msgSender()] > 0, "Not whitelisted");
        require(
            claimedWhitelistTokens[_msgSender()] + _noOfMints <=
                whitelistMints[_msgSender()],
            "Exceeds whitelisted mint limit"
        );
         require(
            _noOfMints <= MAX_MINT_PER_TX,
            "Exceeds maximum mint per transaction"
        );
        claimedWhitelistTokens[_msgSender()] += _noOfMints;
         _mint(_msgSender(), _noOfMints);
    }

    function setMaxSupply(uint256 _maxSupply) external onlyOwner {
        MAX_SUPPLY = _maxSupply;
    }

    function setMaxMintPerTx(uint256 _maxMintPerTx) external onlyOwner {
        MAX_MINT_PER_TX = _maxMintPerTx;
    }

    function setPublicMintPrice(uint256 _publicMintPrice) external onlyOwner {
        PUBLIC_MINT_PRICE = _publicMintPrice;
    }

    function addToWhitelist(
        address[] calldata _addresses,
        uint256[] calldata _noOfMints
    ) external onlyOwner {
        require(_addresses.length == _noOfMints.length, "Invalid input length");

        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelistMints[_addresses[i]] = _noOfMints[i];
        }
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}
