import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  try {


    const faunaUserRef = await fauna.query(
      q.Select(
        "ref",
        q.Get(
          q.Match(
            q.Index('users_by_stripe_customer_id'), // passei mo conta tentando enter porque estava dando eu, eu coloquei o customerId dentro do index ex: q.Index('x', customerId) e na realidade é fora
            customerId
          )
        )
      )
    );

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
      id: subscription.id,
      userId: faunaUserRef,
      status: subscription.status,
      price: subscription.items.data[0].price.id
    }

    if (createAction) {
      await fauna.query(
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index('subscriptions_by_id'),
                subscriptionId
              )
            )
          ),
          q.Create(
            q.Collection('subscriptions'),
            { data: subscriptionData }
          ),
          false
        )
      )

    } else {
      await fauna.query(
        q.Replace(
          q.Select(
            "ref",
            q.Get(
              q.Match(
                q.Index('subscriptions_by_id'),
                subscriptionId
              )
            )
          ),
          { data: subscriptionData }
        )
      )
    }

  } catch (error) {
    console.log(error);

  }


}