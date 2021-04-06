import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'POST') {
        const checkoutSession = await stripe.checkout.sessions.create({
            customer: {},
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
    } else {
        response.setHeader('Allow', 'POST');
        response.status(405).end('Method not allowed');
    }
}