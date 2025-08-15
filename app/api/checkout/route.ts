// app/api/checkout/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeSecret = process.env.STRIPE_SECRET_KEY
if (!stripeSecret) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment')
}

// don't pass apiVersion to avoid TS mismatch (or cast it to any if you really need)
const stripe = new Stripe(stripeSecret, {
  // apiVersion: '2025-07-30.basil' as any, // <-- alternate: cast to any
})

export async function POST(req: Request) {
  try {
    // expected payload: { items: CartItem[], discount: number }
    const body = await req.json()
    const items: any[] = body.items || []
    const discount: number = body.discount || 0

    // Compute total in AZN (ensure numbers)
    const total = Math.max(
      0,
      Math.round(
        items.reduce((acc: number, it: any) => acc + Number(it.price || 0) * Number(it.quantity || 1), 0) -
          Number(discount || 0)
      )
    )

    // Stripe expects amount in cents (or smallest currency unit)
    const amountInKurus = Math.round(total * 100)

    // Create a single checkout session line for total (simpler and safe)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'azn',
            product_data: {
              name: 'Order Total',
              description: `Items: ${items.length}`,
            },
            unit_amount: amountInKurus,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('checkout error', err)
    return NextResponse.json({ error: 'Ödəniş sessiyası yaradıla bilmədi.' }, { status: 500 })
  }
}
