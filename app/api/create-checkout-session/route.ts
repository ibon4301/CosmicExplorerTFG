import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plan } = body;

    const prices = {
      'Basic': 499, // 4.99€ en céntimos
      'Pro': 1299, // 12.99€ en céntimos
      'Explorer': 1999, // 19.99€ en céntimos
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Plan ${plan}`,
              description: `Suscripción mensual al plan ${plan} de Cosmic Explorer`,
            },
            unit_amount: prices[plan as keyof typeof prices],
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      allow_promotion_codes: true,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error al crear la sesión de pago' },
      { status: 500 }
    );
  }
} 