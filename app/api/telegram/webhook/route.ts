import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

export async function POST(request: NextRequest) {
  // Log de inicio (esto debería aparecer en los logs de Vercel)
  console.log('Webhook POST recibido');
  
  try {
    const body = await request.json();
    console.log('Body:', JSON.stringify(body, null, 2));
    
    if (body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text || '[sin texto]';
      console.log(`Mensaje de ${chatId}: "${text}"`);
      await sendMessage(chatId, `Recibí tu mensaje: "${text}"`);
    }
    
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

async function sendMessage(chatId: number, text: string) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });
  return response.json();
}

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Webhook funcionando' });
}