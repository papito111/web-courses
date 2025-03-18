import { headers } from "next/headers";
import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  // Get raw body and signature
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    // Verify webhook signature to ensure it's coming from Stripe
    event = stripe.webhooks.constructEvent(
      body, signature, process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error('Webhook Signature Verification Failed:', error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Process the event
  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      console.error("Missing metadata in session:", session);
      return new NextResponse("Missing metadata", { status: 400 });
    }

    try {
      // Save purchase details in the database
      await db.purchase.create({
        data: {
          courseId: courseId,
          userId: userId,
        },
      });
      console.log(`Purchase created for User: ${userId}, Course: ${courseId}`);
    } catch (dbError: any) {
      console.error('Database Error:', dbError.message);
      return new NextResponse('Database Error: ' + dbError.message, { status: 500 });
    }
  } else {
    // Handle other events if needed
    console.log('Unhandled event type:', event.type);
    return new NextResponse(event.type, { status: 200 });
  }

  // Acknowledge the event was successfully processed
  return new NextResponse(null, { status: 200 });
}
