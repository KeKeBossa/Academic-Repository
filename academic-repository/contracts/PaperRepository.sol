// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PaperRepository is Ownable {
    uint256 private _currentPaperId = 0; // 標準のIDカウンターを使用

    struct Paper {
        uint256 id;
        string title;
        address author;
        string ipfsHash;
        uint256 timestamp;
    }

    mapping(uint256 => Paper) public papers;
    address[] public authors;

    event PaperUploaded(uint256 id, string title, address indexed author, string ipfsHash);

    constructor() Ownable(msg.sender) {}

    function uploadPaper(string calldata _title, string calldata _ipfsHash) external {
        _currentPaperId++;
        uint256 newPaperId = _currentPaperId;

        papers[newPaperId] = Paper(
            newPaperId,
            _title,
            msg.sender,
            _ipfsHash,
            block.timestamp
        );

        bool authorExists = false;
        for(uint i = 0; i < authors.length; i++){
            if(authors[i] == msg.sender){
                authorExists = true;
                break;
            }
        }
        if(!authorExists){
            authors.push(msg.sender);
        }

        emit PaperUploaded(newPaperId, _title, msg.sender, _ipfsHash);
    }

    function getPaper(uint256 _id) external view returns (string memory, address, string memory, uint256) {
        Paper storage p = papers[_id];
        require(p.id != 0, "Paper not found");
        return (p.title, p.author, p.ipfsHash, p.timestamp);
    }

    function getTotalPapers() public view returns (uint256) {
        return _currentPaperId;
    }
}