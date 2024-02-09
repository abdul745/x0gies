// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract X0giesA is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Pausable, Ownable, ERC721Burnable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("X0giesA", "X0G")
        Ownable(initialOwner)
    {
        _pause();
        MAX_SUPPLY = 4444;
        MAX_MINT_PER_TX = 10;
        PUBLIC_MINT_PRICE = 0.004 ether;
    }

    uint256 public  MAX_SUPPLY;
    uint256 public  MAX_MINT_PER_TX;
    uint256 public  PUBLIC_MINT_PRICE;

    //How many NFTs are allowed to mint Per Wallet Address
    mapping(address => uint256) public whitelistMints;

    //How many NFTs are claimed/transferred by an Address
    mapping(address => uint256) public claimedWhitelistTokens;

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(uint256 _noOfMints) external payable whenNotPaused {
        require(_nextTokenId + _noOfMints <= MAX_SUPPLY, "Exceeds maximum supply");
        require(_noOfMints <= MAX_MINT_PER_TX, "Exceeds maximum mint per transaction");

        if (whitelistMints[_msgSender()] > 0 && claimedWhitelistTokens[_msgSender()] < whitelistMints[_msgSender()]) {
            uint256 remainingMints = whitelistMints[_msgSender()] - claimedWhitelistTokens[_msgSender()];
            if (_noOfMints <= remainingMints) {
                claimedWhitelistTokens[_msgSender()] += _noOfMints;
            } else {
                require(msg.value == PUBLIC_MINT_PRICE * (_noOfMints - remainingMints), "Insufficient ETH sent");
                claimedWhitelistTokens[_msgSender()] = whitelistMints[_msgSender()];
            }
        } else {
            require(msg.value >= PUBLIC_MINT_PRICE * _noOfMints, "Insufficient ETH sent");
        }

        for (uint256 i = 0; i < _noOfMints; i++) {
            uint256 tokenId = _nextTokenId++;
            _safeMint(_msgSender(), tokenId);
        }
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

    function addToWhitelist(address[] calldata _addresses, uint256[] calldata _noOfMints) external onlyOwner {
        require(_addresses.length == _noOfMints.length, "Invalid input length");

        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelistMints[_addresses[i]] = _noOfMints[i];
        }
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
