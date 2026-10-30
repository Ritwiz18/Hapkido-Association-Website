import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateRegistrationId } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, gender, district, phone, email, qualification, experience, blackBeltLevel, address } = body;

    if (!fullName || !phone || !district) {
      return NextResponse.json({ error: 'Name, phone, and district are required' }, { status: 400 });
    }

    const registrationId = generateRegistrationId('CCH');

    const coach = await prisma.coach.create({
      data: {
        registrationId,
        fullName,
        gender: gender || null,
        district,
        phone,
        email: email || null,
        qualification: qualification || null,
        experience: experience ? parseInt(experience) : null,
        blackBeltLevel: blackBeltLevel || null,
        address: address || null,
        status: 'PENDING',
      },
    });

    await prisma.auditLog.create({
      data: { action: 'COACH_REGISTERED', entity: 'Coach', entityId: coach.id, details: `${fullName} from ${district}` },
    });

    return NextResponse.json({ success: true, registrationId, coachId: coach.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
