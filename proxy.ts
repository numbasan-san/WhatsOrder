import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(`Proxy: ${path}`); // ← Agregar log para depuración

  // Rutas públicas
  const publicRoutes = [
    '/auth/login',
    '/auth/sign-up',
    '/auth/forgot-password',
    '/auth/update-password',
    '/auth/error',
    '/auth/confirm',
    '/auth/sign-up-success',
    '/api/telegram/webhook',  // Asegurar que está aquí
    '/api/test',
  ];

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};