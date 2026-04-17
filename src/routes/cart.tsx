import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus, Trash2, ShoppingBag, MapPin, CreditCard } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [{ title: "Your cart — Morsel" }, { name: "description", content: "Review your order and check out." }],
  }),
});

function CartPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState("12 Pali Hill, Bandra West");
  const [placing, setPlacing] = useState(false);

  const lines = Object.values(cart.lines);
  const deliveryFee = cart.subtotal > 0 ? 39 : 0;
  const taxes = Math.round(cart.subtotal * 0.05);
  const total = cart.subtotal + deliveryFee + taxes;

  const placeOrder = () => {
    setPlacing(true);
    const orderId = `M${Date.now().toString().slice(-6)}`;
    setTimeout(() => {
      try {
        const summary = { orderId, restaurantName: cart.restaurantName, lines, total, address, placedAt: Date.now() };
        if (typeof window !== "undefined") {
          localStorage.setItem(`morsel.order.${orderId}`, JSON.stringify(summary));
        }
      } catch {
        // ignore
      }
      cart.clear();
      navigate({ to: "/order/$id", params: { id: orderId } });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <h1 className="font-display text-4xl md:text-5xl">Your cart</h1>
        {cart.restaurantName && (
          <p className="mt-2 text-sm text-muted-foreground">
            From <span className="text-bone">{cart.restaurantName}</span>
          </p>
        )}

        {lines.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-border bg-gradient-card p-10 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
            <h2 className="mt-4 font-display text-2xl">Empty plate.</h2>
            <p className="mt-2 text-sm text-muted-foreground">Pick a restaurant and start ordering.</p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Browse restaurants
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6">
            {/* Items */}
            <div className="rounded-3xl border border-border bg-gradient-card p-2">
              {lines.map((line, idx) => (
                <div
                  key={line.item.id}
                  className={
                    "flex items-start gap-4 p-4 " +
                    (idx !== 0 ? "border-t border-border" : "")
                  }
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg leading-tight">{line.item.name}</h3>
                    <p className="line-clamp-1 text-xs text-muted-foreground">{line.item.description}</p>
                    <p className="mt-1 font-mono text-sm">₹{line.item.price}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-ember bg-ember/10 px-2 py-1.5">
                    <button onClick={() => cart.setQty(line.item.id, line.qty - 1)} className="rounded-full p-1 text-ember hover:bg-ember/20" aria-label="Decrease">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-5 text-center text-sm font-semibold">{line.qty}</span>
                    <button onClick={() => cart.setQty(line.item.id, line.qty + 1)} className="rounded-full p-1 text-ember hover:bg-ember/20" aria-label="Increase">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button onClick={() => cart.remove(line.item.id)} className="rounded-full p-2 text-muted-foreground hover:text-destructive" aria-label="Remove">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="rounded-3xl border border-border bg-gradient-card p-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <MapPin className="h-4 w-4 text-ember" /> Deliver to
              </div>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-ember focus:outline-none"
              />
            </div>

            {/* Bill */}
            <div className="rounded-3xl border border-border bg-gradient-card p-6">
              <h3 className="mb-4 font-display text-xl">Bill details</h3>
              <dl className="space-y-2 font-mono text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>₹{cart.subtotal}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>₹{deliveryFee}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Taxes</dt><dd>₹{taxes}</dd></div>
                <div className="mt-2 flex justify-between border-t border-border pt-3 text-base font-semibold text-bone"><dt>Total</dt><dd>₹{total}</dd></div>
              </dl>
            </div>

            <button
              onClick={placeOrder}
              disabled={placing}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ember px-6 py-4 text-base font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-60"
            >
              <CreditCard className="h-4 w-4" />
              {placing ? "Placing order…" : `Place order · ₹${total}`}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
