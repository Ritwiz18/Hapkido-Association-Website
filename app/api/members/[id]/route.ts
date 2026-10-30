import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const player = await prisma.player.update({ where: { id }, data: body });
    await prisma.auditLog.create({
      data: { action: `STATUS_CHANGED_${body.status}`, entity: 'Player', entityId: id, details: body.notes || '' },
    });
    return NextResponse.json({ success: true, player });
  } catch { return NextResponse.json({ error: 'Failed to update' }, { status: 500 }); }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const player = await prisma.player.findUnique({ where: { id } });
    if (!player) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, player });
  } catch { return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 }); }
}
