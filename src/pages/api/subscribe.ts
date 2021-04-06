import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    if(request.method === 'POST'){
        const checkoutSession = await stripe.checkout.sessions.create({
            
        })
    } else {
      response.setHeader('Allow', 'POST');
      response.status(405).end('Method not allowed');
    }
}