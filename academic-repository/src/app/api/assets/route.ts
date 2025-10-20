import { NextRequest, NextResponse } from 'next/server';
import { AssetVisibility, Prisma, ActivityType } from '@prisma/client';
import { prisma } from '../../../../server/db/client';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const daoId = searchParams.get('daoId');
  const ownerId = searchParams.get('ownerId');
  const visibility = searchParams.get('visibility');

  const where: Prisma.ResearchAssetWhereInput = {
    daoId: daoId ?? undefined,
    ownerId: ownerId ?? undefined,
    visibility: visibility ? (visibility.toUpperCase() as AssetVisibility) : undefined
  };

  const assets = await prisma.researchAsset.findMany({
    where,
    include: {
      owner: { select: { id: true, displayName: true, walletAddress: true } },
      dao: { select: { id: true, name: true } },
      proposal: { select: { id: true, title: true, status: true } },
      reviews: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json({ assets });
}

export async function POST(request: NextRequest) {
  const input = (await request.json()) as {
    daoId: string;
    ownerId: string;
    title: string;
    abstract?: string;
    ipfsCid: string;
    artifactHash?: string;
    tags?: string[];
    visibility?: string;
    proposalId?: string;
    metadata?: unknown;
  };

  if (!input.daoId || !input.ownerId || !input.title || !input.ipfsCid) {
    return NextResponse.json(
      { error: 'daoId, ownerId, title, and ipfsCid are required' },
      { status: 400 }
    );
  }

  const visibilityKey = input.visibility?.toUpperCase() as keyof typeof AssetVisibility | undefined;
  const normalizedVisibility =
    visibilityKey && AssetVisibility[visibilityKey]
      ? AssetVisibility[visibilityKey]
      : AssetVisibility.INTERNAL;

  const asset = await prisma.researchAsset.create({
    data: {
      daoId: input.daoId,
      ownerId: input.ownerId,
      title: input.title,
      abstract: input.abstract ?? null,
      ipfsCid: input.ipfsCid,
      artifactHash: input.artifactHash ?? null,
      tags: input.tags ?? [],
      visibility: normalizedVisibility,
      proposalId: input.proposalId ?? null,
      metadata: input.metadata as Prisma.JsonValue
    }
  });

  await prisma.activityLog.create({
    data: {
      daoId: asset.daoId,
      actorId: asset.ownerId,
      assetId: asset.id,
      type: ActivityType.RESEARCH_ASSET_REGISTERED,
      metadata: {
        title: asset.title,
        ipfsCid: asset.ipfsCid,
        visibility: asset.visibility
      }
    }
  });

  return NextResponse.json({ asset }, { status: 201 });
}
