import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Modo mock o protección normal
  if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
    console.log(`Modo mock: permitir "${path}"`);
    return NextResponse.next();
  }

  if (path === '/api/telegram/webhook' || path.startsWith('/api/telegram/webhook')) {
    console.log('Webhook de Telegram: acceso permitido sin autenticación');
    return NextResponse.next();
  }

  // Otras rutas públicas
  const publicRoutes = [
    '/auth/login',
    '/auth/sign-up',
    '/auth/forgot-password',
    '/auth/update-password',
    '/auth/error',
    '/auth/confirm',
    '/auth/sign-up-success',
    '/api/test',
  ];

  if (publicRoutes.some(route => path.startsWith(route))) {
    console.log(`Ruta pública: "${path}"`);
    return NextResponse.next();
  }

  console.log(`Ruta protegida, redirigiendo: "${path}"`);
  const redirectUrl = new URL('/auth/login', request.url);
  redirectUrl.searchParams.set('redirectedFrom', path);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};