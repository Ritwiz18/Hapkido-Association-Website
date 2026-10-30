import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [
      totalPlayers,
      totalCoaches,
      totalAcademies,
      pendingPlayers,
      pendingCoaches,
      pendingAcademies,
      totalNews,
      totalEvents,
      upcomingEvents,
      unreadMessages,
      settings,
      recentPlayers,
      recentAcademies,
    ] = await Promise.all([
      prisma.player.count({ where: { status: 'APPROVED' } }),
      prisma.coach.count({ where: { status: 'APPROVED' } }),
      prisma.academy.count({ where: { status: 'APPROVED' } }),
      prisma.player.count({ where: { status: 'PENDING' } }),
      prisma.coach.count({ where: { status: 'PENDING' } }),
      prisma.academy.count({ where: { status: 'PENDING' } }),
      prisma.news.count({ where: { published: true } }),
      prisma.event.count(),
      prisma.event.count({ where: { status: 'UPCOMING' } }),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.siteSettings.findUnique({ where: { id: 'singleton' } }),
      prisma.player.findMany({ take: 5, orderBy: { createdAt: 'desc' }, select: { id: true, fullName: true, district: true, beltLevel: true, status: true, createdAt: true } }),
      prisma.academy.findMany({ take: 5, orderBy: { createdAt: 'desc' }, select: { id: true, name: true, district: true, status: true, createdAt: true } }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalPlayers,
        totalCoaches,
        totalAcademies,
        pendingApprovals: pendingPlayers + pendingCoaches + pendingAcademies,
        pendingPlayers,
        pendingCoaches,
        pendingAcademies,
        totalNews,
        totalEvents,
        upcomingEvents,
        unreadMessages,
      },
      settings,
      recentPlayers,
      recentAcademies,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
