import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../server/db/client';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const nonce = searchParams.get('nonce');

  if (!nonce) {
    return NextResponse.json({ error: 'nonce query param is required' }, { status: 400 });
  }

  const session = await prisma.didSession.findUnique({
    where: { nonce },
    include: {
      user: {
        select: { id: true, walletAddress: true, did: true, role: true, displayName: true }
      }
    }
  });

  if (!session || session.revokedAt || session.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Session not found or expired' }, { status: 404 });
  }

  return NextResponse.json({
    nonce: session.nonce,
    expiresAt: session.expiresAt.toISOString(),
    user: session.user
  });
}
