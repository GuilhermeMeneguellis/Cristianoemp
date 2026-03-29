import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, service, message } = body;

    if (!name || !service) {
      return NextResponse.json(
        { error: 'Nome e serviço são obrigatórios.' },
        { status: 400 }
      );
    }

    // Replace this with the actual WhatsApp number of the constructor
    const phoneNumber = '5511999999999';

    // Construct the WhatsApp message
    const whatsappMessage = `Olá, meu nome é ${name}. Gostaria de solicitar um orçamento para: ${service}.${message ? ` Detalhes: ${message}` : ''}`;

    // Create the WhatsApp link
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return NextResponse.json({ success: true, url: whatsappUrl });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a solicitação.' },
      { status: 500 }
    );
  }
}
