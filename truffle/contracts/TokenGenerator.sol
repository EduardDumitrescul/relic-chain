pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TokenGenerator is ERC721{
    uint256 public tokenCount = 0;

    event TokenCreated(uint256 id, string name, address owner);

    mapping(address => uint256[]) private tokens;
    mapping(uint256 => string) private names;
    mapping(uint256 => string) private descriptions;
    mapping(uint256 => string) private imagesUrls;

    constructor()
    ERC721("RelicToken", "RTK") {}

    function createToken(address owner, string memory name, string memory description, string memory url) external  {
        tokenCount++;
        uint256 newTokenId = tokenCount;
        _safeMint(owner, newTokenId);
        tokens[owner].push(newTokenId);
        names[newTokenId] = name;
        descriptions[newTokenId] = description;
        imagesUrls[newTokenId] = url;
        emit TokenCreated(newTokenId, name, owner);
    }

    function transferToken(address from, address to, uint256 tokenId) external {
        safeTransferFrom(from, to, tokenId);
        for(uint256 i = 0; i < tokens[from].length; i ++) {
            if(tokens[from][i] == tokenId) {
                tokens[from][i] = tokens[from][tokens[from].length - 1];
            }
        }
        tokens[from].pop();
        tokens[to].push(tokenId);
    }

    function name(uint256 tokenId)
    public
    view
    returns (string memory){
        return names[tokenId];
    }

    function description(uint256 tokenId)
    public
    view
    returns (string memory){
        return descriptions[tokenId];
    }

    function url(uint256 tokenId)
    public
    view
    returns (string memory){
        return imagesUrls[tokenId];
    }

    function getTokenIds()
    public
    view
    returns (uint256[] memory) {
        return tokens[msg.sender];
    }
}
