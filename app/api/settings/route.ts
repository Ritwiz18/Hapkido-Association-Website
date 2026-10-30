import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
    return NextResponse.json({ success: true, settings });
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const settings = await prisma.siteSettings.upsert({
      where: { id: 'singleton' },
      update: body,
      create: { id: 'singleton', ...body },
    });
    return NextResponse.json({ success: true, settings });
  } catch { return NextResponse.json({ error: 'Failed to update' }, { status: 500 }); }
}
