'use client';

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const features = [
  {
    title: 'ウォレット & DID 認証',
    description:
      'MetaMaskなどのEVMウォレットとDID署名で安全にログインし、学生証VCで資格を証明します。'
  },
  {
    title: 'DAO ガバナンス',
    description:
      'ラボごとの提案・投票を管理し、役割に応じた投票重みとタイムロック付きの意思決定を提供します。'
  },
  {
    title: '学術成果の共有',
    description:
      'IPFSへアップロードした論文やデータをCIDで追跡し、DAOメンバーにレビューとコメントを依頼できます。'
  },
  {
    title: '共同研究の促進',
    description:
      '募集掲示板とアクティビティフィードで共同研究の参加者を募り、最新の動向をリアルタイムで把握します。'
  }
];

export default function HomePage() {
  return (
    <Container maxW="6xl" py={{ base: 16, md: 24 }}>
      <Stack spacing={16}>
        <Stack
          spacing={8}
          align="center"
          textAlign="center"
          bg="rgba(15, 23, 42, 0.6)"
          p={{ base: 8, md: 12 }}
          borderRadius="2xl"
          border="1px solid"
          borderColor="whiteAlpha.200"
        >
          <Heading size="2xl" lineHeight="shorter">
            学術成果をDAOで加速させる分散型リポジトリ
          </Heading>
          <Text fontSize="lg" color="whiteAlpha.800" maxW="3xl">
            ウォレット連携とVerifiable
            Credentialで信頼性を担保し、研究成果の登録からガバナンス、共同研究までを一元管理するプラットフォームです。
          </Text>
          <HStack spacing={4}>
            <ConnectButton label="ウォレットを接続" />
            <Button variant="outline" size="lg">
              プロダクト概要を見る
            </Button>
          </HStack>
        </Stack>
        <Box>
          <Heading size="lg" mb={6}>
            プラットフォームのコア機能
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {features.map((feature) => (
              <Card
                key={feature.title}
                bg="rgba(30, 41, 59, 0.7)"
                border="1px solid"
                borderColor="whiteAlpha.100"
                shadow="lg"
              >
                <CardBody>
                  <Heading size="md" mb={3}>
                    {feature.title}
                  </Heading>
                  <Text color="whiteAlpha.700">{feature.description}</Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      </Stack>
    </Container>
  );
}
