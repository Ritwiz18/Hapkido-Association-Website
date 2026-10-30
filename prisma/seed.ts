import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding USHA database...');

  // ─── Admin User ─────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('Admin@123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@usha.org' },
    update: {},
    create: {
      email: 'admin@usha.org',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // ─── Site Settings ──────────────────────────────────────────
  await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      totalPlayers: 500,
      totalAcademies: 45,
      districtsCovered: 13,
      certifiedCoaches: 60,
      blackBeltHolders: 85,
      nationalMedals: 150,
    },
  });
  console.log('✅ Site settings initialized');

  // ─── Sample News ─────────────────────────────────────────────
  const newsItems = [
    {
      title: 'USHA Announces State Championship 2025',
      slug: 'state-championship-2025',
      description: 'The Uttarakhand Sports Hapkido Association is proud to announce the upcoming State Hapkido Championship 2025 to be held at Sports Stadium, Dehradun on September 15-16, 2025.',
      category: 'Tournament',
      published: true,
    },
    {
      title: 'Uttarakhand Athletes Win 12 Medals at Nationals',
      slug: 'national-medals-2025',
      description: 'Our athletes made Uttarakhand proud at the National Hapkido Championship, winning 4 Gold, 3 Silver, and 5 Bronze medals.',
      category: 'Achievement',
      published: true,
    },
    {
      title: 'New Academy Affiliation Program Launched',
      slug: 'academy-affiliation-2025',
      description: 'USHA has launched a simplified online affiliation program for Hapkido academies with reduced fees and digital document verification.',
      category: 'General',
      published: true,
    },
  ];

  for (const item of newsItems) {
    await prisma.news.upsert({
      where: { slug: item.slug },
      update: {},
      create: item,
    });
  }
  console.log('✅ Sample news created');

  // ─── Sample Events ───────────────────────────────────────────
  const events = [
    {
      title: 'State Hapkido Championship 2025',
      slug: 'state-championship-2025-event',
      description: 'Open to all belt levels. Individual and team events.',
      date: new Date('2025-09-15'),
      venue: 'Sports Stadium, Dehradun',
      category: 'Championship',
      status: 'UPCOMING' as const,
      registrationLink: '/registration',
    },
    {
      title: 'Summer Training Camp 2025',
      slug: 'summer-camp-2025',
      description: '10-day residential camp for intermediate and advanced students.',
      date: new Date('2025-07-22'),
      venue: 'USHA Dojo, Haridwar',
      category: 'Training Camp',
      status: 'UPCOMING' as const,
      registrationLink: '/registration',
    },
    {
      title: 'International Hapkido Seminar',
      slug: 'international-seminar-2025',
      description: 'Master-level seminar with Grand Master Kim Ji-hoon from South Korea.',
      date: new Date('2025-08-10'),
      venue: 'Uttarakhand Sports Academy',
      category: 'Seminar',
      status: 'UPCOMING' as const,
      registrationLink: '/registration',
    },
  ];

  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: event,
    });
  }
  console.log('✅ Sample events created');

  // ─── Sample Achievements ─────────────────────────────────────
  const achievements = [
    { title: 'National Gold Medal', playerName: 'Rajan Negi', level: 'NATIONAL', year: 2024, medal: 'Gold', category: 'Player', description: '84kg Senior Category — National Hapkido Championship, Delhi' },
    { title: 'National Silver Medal', playerName: 'Vikram Rawat', level: 'NATIONAL', year: 2023, medal: 'Silver', category: 'Player', description: '74kg Category — National Championship, Mumbai' },
    { title: 'International Bronze Medal', playerName: 'Deepak Rana', level: 'INTERNATIONAL', year: 2023, medal: 'Bronze', category: 'Player', description: 'Asia Pacific Championship — Bangkok, Thailand' },
    { title: 'Best State Association Award', playerName: 'USHA', level: 'NATIONAL', year: 2022, medal: 'Award', category: 'Association', description: 'Awarded by Indian Hapkido Federation for excellence in governance' },
    { title: 'Youth National Gold', playerName: 'Ankit Sharma', level: 'NATIONAL', year: 2024, medal: 'Gold', category: 'Player', description: 'Under-18 Category — National Youth Championship' },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.create({ data: achievement }).catch(() => {});
  }
  console.log('✅ Sample achievements created');

  // ─── Sample Academy ──────────────────────────────────────────
  const academy = await prisma.academy.upsert({
    where: { registrationId: 'ACD-2025-1000' },
    update: {},
    create: {
      registrationId: 'ACD-2025-1000',
      name: 'Dehradun Hapkido Club',
      ownerName: 'Master Rajan Negi',
      address: 'Near Sports Complex, Rajpur Road, Dehradun',
      district: 'Dehradun',
      phone: '+91 9876543210',
      email: 'ddn.hapkido@email.com',
      status: 'APPROVED',
    },
  });
  console.log('✅ Sample academy created');

  // ─── Sample Players ──────────────────────────────────────────
  const players = [
    { registrationId: 'PLY-2025-10001', fullName: 'Ankit Sharma', district: 'Dehradun', gender: 'Male', phone: '9876543210', beltLevel: 'Yellow Belt', status: 'APPROVED' as const },
    { registrationId: 'PLY-2025-10002', fullName: 'Priya Rawat', district: 'Haridwar', gender: 'Female', phone: '9876543211', beltLevel: 'Green Belt', status: 'APPROVED' as const },
    { registrationId: 'PLY-2025-10003', fullName: 'Rohan Negi', district: 'Nainital', gender: 'Male', phone: '9876543212', beltLevel: 'Blue Belt', status: 'PENDING' as const },
  ];

  for (const player of players) {
    await prisma.player.upsert({
      where: { registrationId: player.registrationId },
      update: {},
      create: { ...player, academyId: academy.id },
    });
  }
  console.log('✅ Sample players created');

  console.log('\n🎉 Database seeded successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔐 Admin credentials:');
  console.log('   Email:    admin@usha.org');
  console.log('   Password: Admin@123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
