import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.achievement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Failed to delete' }, { status: 500 }); }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const achievement = await prisma.achievement.update({ where: { id }, data: body });
    return NextResponse.json({ success: true, achievement });
  } catch { return NextResponse.json({ error: 'Failed to update' }, { status: 500 }); }
}
