import { headers } from "next/headers";
import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";


export async function POST(req:Request) {

    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try { 
        event = stripe.webhooks.constructEvent(
            body, signature, process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch(error: any){
        return new NextResponse(`${error.message}`, {status:400})
    }
    
}