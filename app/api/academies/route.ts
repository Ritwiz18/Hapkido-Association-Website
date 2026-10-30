import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'APPROVED';
    const district = searchParams.get('district');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where = {
      status: status as 'PENDING' | 'APPROVED' | 'REJECTED',
      ...(district ? { district } : {}),
      ...(search ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { registrationId: { contains: search } },
          { ownerName: { contains: search, mode: 'insensitive' as const } },
        ],
      } : {}),
    };

    const [academies, total] = await Promise.all([
      prisma.academy.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: { id: true, registrationId: true, name: true, ownerName: true, district: true, phone: true, status: true, logo: true, createdAt: true },
      }),
      prisma.academy.count({ where }),
    ]);

    return NextResponse.json({ success: true, academies, total, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch academies' }, { status: 500 });
  }
}
