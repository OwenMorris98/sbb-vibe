import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import { randomUUID } from "crypto";
import { decrementStock } from "@/lib/sheets";

interface LineItem {
  id: string;
  name: string;
  price: number; // in dollars
  quantity: number;
}

interface CheckoutRequest {
  items: LineItem[];
}

function getSquareClient() {
  return new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN ?? "",
    environment:
      process.env.SQUARE_ENVIRONMENT === "production"
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutRequest = await req.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const locationId = process.env.SQUARE_LOCATION_ID;
    if (!process.env.SQUARE_ACCESS_TOKEN || !locationId) {
      return NextResponse.json(
        { error: "Checkout is not configured yet. Please try again later." },
        { status: 503 }
      );
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? req.nextUrl.origin;
    const client = getSquareClient();

    const result = await client.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      order: {
        locationId,
        lineItems: body.items.map((item) => ({
          name: item.name,
          quantity: String(item.quantity),
          basePriceMoney: {
            amount: BigInt(Math.round(item.price * 100)),
            currency: "USD",
          },
        })),
      },
      checkoutOptions: {
        redirectUrl: `${origin}/our-shop/success`,
        askForShippingAddress: true,
      },
    });

    const checkoutUrl = result.paymentLink?.url;
    if (!checkoutUrl) {
      throw new Error("Square did not return a checkout URL.");
    }

    // Decrement stock in Google Sheets now that the order is in motion.
    // This runs after the payment link is created (not after payment is confirmed).
    // Errors here are logged but do NOT block the checkout redirect.
    decrementStock(
      body.items.map((i) => ({ productId: i.id, quantity: i.quantity }))
    ).catch((err) => {
      console.error("Stock decrement failed (non-fatal):", err);
    });

    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error("Checkout error:", err);
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
