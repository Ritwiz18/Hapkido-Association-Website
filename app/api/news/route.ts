import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const where = {
      ...(published !== null ? { published: published === 'true' } : {}),
      ...(category && category !== 'All' ? { category } : {}),
    };

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.news.count({ where }),
    ]);

    return NextResponse.json({ success: true, news, total, totalPages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, content, image, category, published } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    let slug = slugify(title);
    // Ensure unique slug
    const existing = await prisma.news.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const article = await prisma.news.create({
      data: { title, slug, description, content: content || null, image: image || null, category: category || 'General', published: published ?? false },
    });

    return NextResponse.json({ success: true, article });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
