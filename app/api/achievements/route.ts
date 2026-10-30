import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({ orderBy: [{ level: 'asc' }, { year: 'desc' }] });
    return NextResponse.json({ success: true, achievements });
  } catch { return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 }); }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, playerName, level, year, medal, category, description } = body;
    if (!title || !playerName) return NextResponse.json({ error: 'Title and player name are required' }, { status: 400 });
    const achievement = await prisma.achievement.create({
      data: { title, playerName, level: level || 'NATIONAL', year: year || new Date().getFullYear(), medal: medal || null, category: category || 'Player', description: description || null },
    });
    return NextResponse.json({ success: true, achievement });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}
