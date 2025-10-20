import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { prisma } from '../../../../server/db/client';

type DidAuthPayload = {
  walletAddress: string;
  did: string;
  displayName?: string;
  email?: string;
};

const SESSION_TTL_MINUTES = 15;

export async function POST(request: NextRequest) {
  let body: DidAuthPayload;

  try {
    body = (await request.json()) as DidAuthPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const { walletAddress, did, displayName, email } = body;
  if (!walletAddress || !did) {
    return NextResponse.json({ error: 'walletAddress and did are required' }, { status: 400 });
  }

  const normalizedWallet = walletAddress.toLowerCase();
  const normalizedDid = did.toLowerCase();

  const user = await prisma.user.upsert({
    where: { walletAddress: normalizedWallet },
    update: {
      did: normalizedDid,
      displayName: displayName ?? undefined,
      email: email ?? undefined
    },
    create: {
      walletAddress: normalizedWallet,
      did: normalizedDid,
      displayName: displayName ?? null,
      email: email ?? null
    }
  });

  const nonce = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MINUTES * 60_000);

  const session = await prisma.didSession.create({
    data: {
      userId: user.id,
      nonce,
      expiresAt
    }
  });

  return NextResponse.json(
    {
      userId: session.userId,
      nonce: session.nonce,
      expiresAt: session.expiresAt.toISOString()
    },
    { status: 201 }
  );
}
