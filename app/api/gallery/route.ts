import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ success: true, images });
  } catch { return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 }); }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const caption = formData.get('caption') as string;
    const album = formData.get('album') as string;

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `${uuidv4()}.${ext}`;
    const uploadPath = join(process.cwd(), 'public', 'uploads', filename);

    // Ensure uploads directory exists
    const { mkdir } = await import('fs/promises');
    await mkdir(join(process.cwd(), 'public', 'uploads'), { recursive: true });
    await writeFile(uploadPath, buffer);

    const image = await prisma.galleryImage.create({
      data: { url: `/uploads/${filename}`, caption: caption || null, album_str: album || 'General' },
    });

    return NextResponse.json({ success: true, image });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
