import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    const events = await prisma.event.findMany({ orderBy: { date: 'asc' } });
    return NextResponse.json({ success: true, events });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, date, endDate, venue, image, category, status, registrationLink } = body;
    if (!title || !date || !venue) {
      return NextResponse.json({ error: 'Title, date, and venue are required' }, { status: 400 });
    }
    let slug = slugify(title);
    const existing = await prisma.event.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;
    const event = await prisma.event.create({
      data: { title, slug, description: description || null, date: new Date(date), endDate: endDate ? new Date(endDate) : null, venue, image: image || null, category: category || 'Championship', status: status || 'UPCOMING', registrationLink: registrationLink || null },
    });
    return NextResponse.json({ success: true, event });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
