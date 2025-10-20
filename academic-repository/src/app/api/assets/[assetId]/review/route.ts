import { NextRequest, NextResponse } from 'next/server';
import { ReviewStatus } from '@prisma/client';
import { prisma } from '../../../../../../server/db/client';

export async function POST(request: NextRequest, { params }: { params: { assetId: string } }) {
  const body = (await request.json()) as {
    reviewerId: string;
    comment: string;
    status?: string;
  };

  if (!params.assetId || !body.reviewerId || !body.comment) {
    return NextResponse.json(
      { error: 'assetId, reviewerId, and comment are required' },
      { status: 400 }
    );
  }

  const statusKey = body.status?.toUpperCase() as keyof typeof ReviewStatus | undefined;
  const normalizedStatus =
    statusKey && ReviewStatus[statusKey] ? ReviewStatus[statusKey] : ReviewStatus.PENDING;

  const review = await prisma.review.create({
    data: {
      assetId: params.assetId,
      reviewerId: body.reviewerId,
      comment: body.comment,
      status: normalizedStatus
    },
    include: {
      reviewer: { select: { id: true, displayName: true } }
    }
  });

  return NextResponse.json({ review }, { status: 201 });
}
