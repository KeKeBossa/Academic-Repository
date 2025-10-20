// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {AccessControl} from '@openzeppelin/contracts/access/AccessControl.sol';

/// @title LabDAO
/// @notice Minimal placeholder for lab governance. To be upgraded with full Governor mechanics.
contract LabDAO is AccessControl {
  bytes32 public constant PROPOSER_ROLE = keccak256('PROPOSER_ROLE');
  bytes32 public constant EXECUTOR_ROLE = keccak256('EXECUTOR_ROLE');

  enum ProposalStatus {
    Pending,
    Active,
    Succeeded,
    Defeated,
    Executed,
    Cancelled
  }

  struct Proposal {
    string title;
    string description;
    string ipfsHash;
    ProposalStatus status;
    uint256 snapshotBlock;
    uint256 deadline;
  }

  Proposal[] private _proposals;

  event ProposalCreated(
    uint256 indexed proposalId,
    address indexed proposer,
    string ipfsHash,
    uint256 deadline
  );
  event ProposalStatusChanged(uint256 indexed proposalId, ProposalStatus status);
  event VoteEmitted(
    uint256 indexed proposalId,
    address indexed voter,
    uint8 choice,
    uint256 weight
  );

  constructor(address admin) {
    _grantRole(DEFAULT_ADMIN_ROLE, admin);
    _grantRole(PROPOSER_ROLE, admin);
    _grantRole(EXECUTOR_ROLE, admin);
  }

  function proposalCount() external view returns (uint256) {
    return _proposals.length;
  }

  function getProposal(uint256 proposalId) external view returns (Proposal memory) {
    require(proposalId < _proposals.length, 'LabDAO: invalid id');
    return _proposals[proposalId];
  }

  function createProposal(
    string calldata title,
    string calldata description,
    string calldata ipfsHash,
    uint256 votingPeriod
  ) external onlyRole(PROPOSER_ROLE) returns (uint256 proposalId) {
    require(bytes(title).length > 0, 'LabDAO: empty title');
    require(votingPeriod > 0, 'LabDAO: period required');

    proposalId = _proposals.length;
    uint256 deadline = block.timestamp + votingPeriod;
    _proposals.push(
      Proposal({
        title: title,
        description: description,
        ipfsHash: ipfsHash,
        status: ProposalStatus.Active,
        snapshotBlock: block.number,
        deadline: deadline
      })
    );

    emit ProposalCreated(proposalId, msg.sender, ipfsHash, deadline);
  }

  function setProposalStatus(
    uint256 proposalId,
    ProposalStatus status
  ) external onlyRole(EXECUTOR_ROLE) {
    require(proposalId < _proposals.length, 'LabDAO: invalid id');
    _proposals[proposalId].status = status;
    emit ProposalStatusChanged(proposalId, status);
  }

  function emitVote(
    uint256 proposalId,
    address voter,
    uint8 choice,
    uint256 weight
  ) external onlyRole(EXECUTOR_ROLE) {
    require(proposalId < _proposals.length, 'LabDAO: invalid id');
    emit VoteEmitted(proposalId, voter, choice, weight);
  }
}
