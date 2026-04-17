import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, ChefHat, Bike, Home, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

type Order = {
  orderId: string;
  restaurantName: string | null;
  lines: { item: { id: string; name: string; price: number }; qty: number }[];
  total: number;
  address: string;
  placedAt: number;
};

export const Route = createFileRoute("/order/$id")({
  component: OrderPage,
  head: ({ params }) => ({
    meta: [{ title: `Order ${params.id} — Morsel` }],
  }),
});

const stages = [
  { key: "confirmed", label: "Order confirmed", icon: CheckCircle2, after: 0 },
  { key: "cooking", label: "Cooking", icon: ChefHat, after: 6 },
  { key: "rider", label: "Rider on the way", icon: Bike, after: 18 },
  { key: "delivered", label: "Delivered", icon: Home, after: 36 },
];

function OrderPage() {
  const { id } = Route.useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(`morsel.order.${id}`) : null;
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, [id]);

  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const elapsed = order ? Math.floor((Date.now() - order.placedAt) / 1000) : 0;
  const currentIdx = (() => {
    let idx = 0;
    stages.forEach((s, i) => {
      if (elapsed >= s.after) idx = i;
    });
    return idx;
  })();
  // tick is referenced to force re-render every second
  void tick;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <div className="rounded-3xl border border-border bg-gradient-card p-6 shadow-card md:p-10">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Order #{id}</div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl text-balance">
            {currentIdx === stages.length - 1 ? "Enjoy. You earned this." : "Your food is on its way."}
          </h1>
          {order?.restaurantName && (
            <p className="mt-2 text-muted-foreground">
              From <span className="text-bone">{order.restaurantName}</span>
            </p>
          )}

          {/* Timeline */}
          <ol className="mt-10 space-y-6">
            {stages.map((s, i) => {
              const Icon = s.icon;
              const done = i < currentIdx;
              const active = i === currentIdx;
              return (
                <li key={s.key} className="flex items-start gap-4">
                  <div
                    className={
                      "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border " +
                      (done
                        ? "border-ember bg-ember text-primary-foreground"
                        : active
                          ? "border-ember bg-ember/10 text-ember"
                          : "border-border bg-card text-muted-foreground")
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {active && (
                      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-ember/40" />
                    )}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div className={"font-display text-lg " + (active ? "text-bone" : done ? "text-bone/80" : "text-muted-foreground")}>
                      {s.label}
                    </div>
                    {active && (
                      <div className="text-xs text-muted-foreground">
                        {s.key === "delivered" ? "Hot off the bike." : "In progress…"}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {order && (
            <div className="mt-10 grid gap-3 border-t border-border pt-6 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 text-ember" />
                <span>{order.address}</span>
              </div>
              <div className="mt-2 grid gap-1 font-mono text-sm">
                {order.lines.map((l) => (
                  <div key={l.item.id} className="flex justify-between">
                    <span className="text-muted-foreground">{l.qty} × {l.item.name}</span>
                    <span>₹{l.qty * l.item.price}</span>
                  </div>
                ))}
                <div className="mt-2 flex justify-between border-t border-border pt-2 text-base font-semibold text-bone">
                  <span>Paid</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </div>
          )}

          <Link to="/" className="mt-10 inline-block text-sm text-ember hover:underline">
            ← Back to restaurants
          </Link>
        </div>
      </section>
    </div>
  );
}
