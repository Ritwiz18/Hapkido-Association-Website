import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
);

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

export async function signToken(payload: JWTPayload): Promise<string> {
  return await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map((c) => {
        const [k, ...v] = c.trim().split('=');
        return [k, v.join('=')];
      })
    );
    return cookies['auth-token'] || null;
  }
  return null;
}

// Role permission matrix
export const ROLE_PERMISSIONS = {
  SUPER_ADMIN: ['*'],
  ADMIN: ['members:read', 'members:write', 'news:*', 'events:*', 'gallery:*', 'settings:read'],
  DISTRICT_ADMIN: ['members:read', 'news:read', 'events:read'],
  ACADEMY_ADMIN: ['members:read', 'members:write:own'],
  COACH: ['members:read:own'],
  VIEWER: ['members:read', 'news:read', 'events:read'],
} as const;

export function hasPermission(role: string, permission: string): boolean {
  const perms = (ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || []) as readonly string[];
  return perms.includes('*') || perms.includes(permission) || perms.some((p) => p.endsWith(':*') && permission.startsWith(p.replace(':*', ':')));
}
