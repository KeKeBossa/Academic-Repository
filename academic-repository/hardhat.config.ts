import type { HardhatUserConfig } from "hardhat/config";
import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable } from "hardhat/config";

// Configuration for HardhatUserConfig properties
const config: HardhatUserConfig = {
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.20", 
      },
      production: {
        version: "0.8.20", 
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
    },
  },
} as const;

// Configuration for the Mocha test runner (declared separately for type safety)
const mochaConfig = {
  mocha: {
    timeout: 40000, 
    spec: ["./test/**/*.ts"], 
    require: ["ts-node/register"], 
  }
} as const;

// ⬇️ 修正箇所: 結合したオブジェクトを変数に代入してからエクスポートします ⬇️
const hardhatConfig = { ...config, ...mochaConfig };

export default hardhatConfig;