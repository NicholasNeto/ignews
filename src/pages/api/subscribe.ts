import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { stripe } from "../../services/stripe";

export default async (req: NextApiRequest, response: NextApiResponse) => {
    if (req.method === 'POST') {
        const session = await getSession({ req })

        const stripeCustomer = await stripe.customers.create({
            email: session.user.email
        })

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id,
            payment_method_types: ['card'],  // cartão de credito
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1Ia6aMEbkLk3zHMAfSBdjUWI', quantity: 1 }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.SUCCESS_URL,
            cancel_url: process.env.CANCEL_URL
        })

        return response.status(200).json({ sessionId: stripeCheckoutSession.id })
    } else {
        response.setHeader('Allow', 'POST');
        response.status(405).end('Method not allowed');
    }
}