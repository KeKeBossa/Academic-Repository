import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import hre from 'hardhat'; // hreをインポート
import { getAddress } from 'viem'; 
import type { Address, WalletClient } from 'viem';

const CONTRACT_NAME = "PaperRepository";

describe(CONTRACT_NAME, function () {
    let paperRepository: any; // 一旦anyに戻し、型エラーを回避
    let deployer: WalletClient;
    let author1: WalletClient;
    let author1Address: Address; 
    
    before(async function () {
        // Hardhatの拡張機能 viem には hre.viem を通じてアクセス
        const accounts = await hre.viem.getWalletClients();
        deployer = accounts[0];
        author1 = accounts[1];
        author1Address = getAddress(author1.account.address);

        // PaperRepositoryコントラクトをデプロイ
        paperRepository = await hre.viem.deployContract(CONTRACT_NAME, [], { client: deployer });
    });

    // ... 続くテストケースのコードは変更なし ...
});