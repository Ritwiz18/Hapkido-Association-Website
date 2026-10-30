import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const image = await prisma.galleryImage.findUnique({ where: { id } });
    if (!image) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Delete file from disk if it's an upload
    if (image.url.startsWith('/uploads/')) {
      try {
        await unlink(join(process.cwd(), 'public', image.url));
      } catch { /* file may not exist */ }
    }

    await prisma.galleryImage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Failed to delete' }, { status: 500 }); }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const image = await prisma.galleryImage.update({ where: { id }, data: body });
    return NextResponse.json({ success: true, image });
  } catch { return NextResponse.json({ error: 'Failed to update' }, { status: 500 }); }
}
