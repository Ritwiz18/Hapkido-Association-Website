import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateRegistrationId } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, ownerName, address, district, phone, email, mapsLink } = body;

    if (!name || !ownerName || !address || !district || !phone) {
      return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
    }

    const registrationId = generateRegistrationId('ACD');

    const academy = await prisma.academy.create({
      data: {
        registrationId,
        name,
        ownerName,
        address,
        district,
        phone,
        email: email || null,
        mapsLink: mapsLink || null,
        status: 'PENDING',
      },
    });

    await prisma.auditLog.create({
      data: { action: 'ACADEMY_REGISTERED', entity: 'Academy', entityId: academy.id, details: `${name} in ${district}` },
    });

    return NextResponse.json({ success: true, registrationId, academyId: academy.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
