import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const academy = await prisma.academy.update({ where: { id }, data: body });
    await prisma.auditLog.create({
      data: { action: `ACADEMY_STATUS_${body.status}`, entity: 'Academy', entityId: id },
    });
    return NextResponse.json({ success: true, academy });
  } catch { return NextResponse.json({ error: 'Failed to update' }, { status: 500 }); }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const academy = await prisma.academy.findUnique({ where: { id }, include: { players: { take: 10 }, coaches: { take: 10 } } });
    if (!academy) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, academy });
  } catch { return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 }); }
}
