    // SPDX-License-Identifier: MIT
    pragma solidity 0.8.20;

    import "erc721a/contracts/ERC721A.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";


    contract X0giesA is ERC721A , Ownable(msg.sender) {
        // uint256 private _nextTokenId();
        uint256 public PUBLIC_SUPPLY;
        uint256 public MAX_MINT_PER_TX;
        uint256 public PUBLIC_MINT_PRICE;
        uint256 public TOTAL_NFTS_MINTED;

        bool public PAUSED;
        constructor() ERC721A("X0giesA", "X0G") {
            PUBLIC_SUPPLY = 2435;
            MAX_MINT_PER_TX = 10;
            PUBLIC_MINT_PRICE = 0.004 ether;
            PAUSED = true;
        }

    
        function getPaused() public view returns (bool) {
        return PAUSED;
        }

        modifier isNotPaused() {
            require(!PAUSED, "Contract is Paused");
            _;
        }

        function pause() external onlyOwner {
            PAUSED = true;
        }

        function unpause() external onlyOwner {
            PAUSED = false;
        }

        string private _baseTokenURI;

        //How many NFTs are allowed to mint Per Wallet Address
        mapping(address => uint256) public whitelistMints;

        //How many NFTs are claimed/transferred by an Address
        mapping(address => uint256) public claimedWhitelistTokens;

        //How many NFTs a user has burnt
        mapping(address => uint256) public burntNFTs;

        function publicMinting(uint256 _noOfMints) external payable isNotPaused {
            require(
                msg.value == PUBLIC_MINT_PRICE * _noOfMints,
                "Insufficient ETH sent"
            );
            require(
                _noOfMints <= MAX_MINT_PER_TX,
                "Exceeds maximum mint per transaction"
            );

            _mint(_msgSender(), _noOfMints);
            TOTAL_NFTS_MINTED += _noOfMints;
        }

        function whitelistedMinting(uint256 _noOfMints)
            external
            payable
            isNotPaused
        {
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
            TOTAL_NFTS_MINTED += _noOfMints;
        }

        function setMaxSupply(uint256 _maxSupply) external onlyOwner {
            PUBLIC_SUPPLY = _maxSupply;
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

        function withdrawEth() external payable onlyOwner {
            address payable ownerPayable = payable(owner());
            ownerPayable.transfer(address(this).balance);
        }

        function burn(uint256 tokenId) external isNotPaused{
            // require(
            //     isApprovedOrOwner(_msgSender(), tokenId),
            //     "Not approved or owner"
            // );
        require(ownerOf(tokenId) ==  msg.sender , "You're not the owner");
            _burn(tokenId);
            burntNFTs[_msgSender()]++;
        }

        function setBaseURI(string calldata baseURI) external onlyOwner {
            _baseTokenURI = baseURI;
        }

        function _baseURI() internal view override returns (string memory) {
            return _baseTokenURI;
        }
    }
