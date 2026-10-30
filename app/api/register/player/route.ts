import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateRegistrationId } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, dob, gender, district, academyName, guardianName, phone, email, address, beltLevel } = body;

    if (!fullName || !phone || !district) {
      return NextResponse.json({ error: 'Name, phone, and district are required' }, { status: 400 });
    }

    const registrationId = generateRegistrationId('PLY');

    const player = await prisma.player.create({
      data: {
        registrationId,
        fullName,
        dob: dob ? new Date(dob) : null,
        gender: gender || null,
        district,
        guardianName: guardianName || null,
        phone,
        email: email || null,
        address: address || null,
        beltLevel: beltLevel || 'White Belt',
        status: 'PENDING',
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: { action: 'PLAYER_REGISTERED', entity: 'Player', entityId: player.id, details: `${fullName} from ${district}` },
    });

    return NextResponse.json({ success: true, registrationId, playerId: player.id });
  } catch (err) {
    console.error('Player registration error:', err);
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get('district');
    const belt = searchParams.get('belt');
    const status = searchParams.get('status') || 'APPROVED';
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where = {
      status: status as 'PENDING' | 'APPROVED' | 'REJECTED',
      ...(district ? { district } : {}),
      ...(belt ? { beltLevel: belt } : {}),
      ...(search ? {
        OR: [
          { fullName: { contains: search, mode: 'insensitive' as const } },
          { registrationId: { contains: search } },
        ],
      } : {}),
    };

    const [players, total] = await Promise.all([
      prisma.player.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: { id: true, registrationId: true, fullName: true, district: true, beltLevel: true, gender: true, status: true, photo: true, createdAt: true },
      }),
      prisma.player.count({ where }),
    ]);

    return NextResponse.json({ success: true, players, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}
