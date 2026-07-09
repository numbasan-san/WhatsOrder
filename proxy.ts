import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Rutas públicas (no requieren autenticación)
  const publicRoutes = [
    '/auth/login',
    '/auth/sign-up',
    '/auth/forgot-password',
    '/auth/update-password',
    '/auth/error',
    '/auth/confirm',
    '/auth/sign-up-success',
    '/api/telegram/webhook',
    '/api/test',
  ];

  // Simular que siempre hay sesión (mock)
  // En desarrollo, permitir acceso a todas las rutas
  if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
    return NextResponse.next();
  }

  // Si la ruta es pública, permitir acceso
  if (publicRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  // Si no hay sesión (en modo real), redirigir al login
  // Aquí iría la lógica real con Supabase
  const redirectUrl = new URL('/auth/login', request.url);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};