import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with:', deployer.address);

  const registry = await ethers.deployContract('LabRegistry', [deployer.address]);
  await registry.waitForDeployment();
  console.log('LabRegistry deployed to:', await registry.getAddress());

  const dao = await ethers.deployContract('LabDAO', [deployer.address]);
  await dao.waitForDeployment();
  console.log('LabDAO deployed to:', await dao.getAddress());

  const artifactRegistry = await ethers.deployContract('ArtifactRegistry', [deployer.address]);
  await artifactRegistry.waitForDeployment();
  console.log('ArtifactRegistry deployed to:', await artifactRegistry.getAddress());

  const credentialAnchor = await ethers.deployContract('CredentialAnchor', [deployer.address]);
  await credentialAnchor.waitForDeployment();
  console.log('CredentialAnchor deployed to:', await credentialAnchor.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
