import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const AcademicRepositoryModule = buildModule('AcademicRepositoryModule', (m) => {
  const admin = m.getAccount(0);
  const registry = m.contract('LabRegistry', [admin]);
  const dao = m.contract('LabDAO', [admin]);
  const artifactRegistry = m.contract('ArtifactRegistry', [admin]);
  const credentialAnchor = m.contract('CredentialAnchor', [admin]);

  return { registry, dao, artifactRegistry, credentialAnchor };
});

export default AcademicRepositoryModule;
