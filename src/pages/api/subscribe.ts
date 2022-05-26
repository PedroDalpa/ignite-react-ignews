import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";

interface FaunaUser {
  ref: {
    id: string
  }
  data: {
    stripe_customer_id: string
  }
}

export default async function subscribe(request: NextApiRequest, response: NextApiResponse) {
  if (request.method == 'POST') {
    const session = await getSession({ req: request });

    const { email } = session.user;



    const faunaUser: FaunaUser = await fauna.query(
      q.Get(
        q.Match(
          q.Index('users_by_email'),
          q.Casefold(email)
        )
      )
    );

    let { stripe_customer_id: customerId } = faunaUser.data;

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email,
        // metadata
      });

      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), faunaUser.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id
            }
          }
        )
      )

      customerId = stripeCustomer.id;
    }



    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1K97aEJ7khQ5iEmzQK3uUUTF', quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    });

    return response.status(200).json({ sessionId: stripeCheckoutSession.id })
  } else {
    response.setHeader('Allow', 'POST')
    response.status(405).end('Method not allowed')
  }

}