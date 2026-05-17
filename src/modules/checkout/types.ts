import { Stripe } from "stripe";

export type ProductMetadata = {
  stripeAccountId: string;
  name: string;
  id: string;
  price: number;
};
export type CheckoutMetadata = {
  userId: string;
};
export type ExpandedLineItem = Stripe.LineItem & {
  price: Stripe.Price & {
    product: Stripe.Product & {
      metadata: ProductMetadata
    }
  }
}