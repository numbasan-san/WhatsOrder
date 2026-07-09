import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verificar que sea un mensaje válido
    if (body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text;
      
      console.log(`Mensaje recibido de ${chatId}: ${text}`);
      
      // Aquí va la lógica de tu agente IA
      // Por ahora, responderemos con un eco
      await sendMessage(chatId, `Recibí tu mensaje: "${text}"`);
    }
    
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error en webhook:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// Función para enviar mensajes
async function sendMessage(chatId: number, text: string) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Webhook de Telegram funcionando correctamente',
    method: 'GET',
    note: 'Este endpoint recibe mensajes por POST'
  });
}