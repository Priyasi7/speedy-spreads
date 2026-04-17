import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, Leaf, Sparkles } from "lucide-react";
import { findRestaurant } from "@/data/restaurants";
import { useCart } from "@/lib/cart";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/r/$id")({
  loader: ({ params }) => {
    const restaurant = findRestaurant(params.id);
    if (!restaurant) throw notFound();
    return { restaurant };
  },
  component: RestaurantPage,
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.restaurant.name} — Morsel` },
          { name: "description", content: loaderData.restaurant.tagline },
          { property: "og:title", content: `${loaderData.restaurant.name} — Morsel` },
          { property: "og:description", content: loaderData.restaurant.tagline },
          { property: "og:image", content: loaderData.restaurant.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl">Restaurant not found</h1>
        <Link to="/" className="mt-6 inline-block text-ember underline">Back home</Link>
      </div>
    </div>
  ),
});

function RestaurantPage() {
  const { restaurant } = Route.useLoaderData();
  const cart = useCart();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          width={1920}
          height={800}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <Link
          to="/"
          className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs text-bone backdrop-blur hover:border-ember/60"
        >
          <ArrowLeft className="h-3 w-3" /> Back
        </Link>
      </section>

      {/* Header card */}
      <section className="mx-auto -mt-24 max-w-4xl px-4 md:px-6">
        <div className="rounded-3xl border border-border bg-gradient-card p-6 shadow-card md:p-8">
          <div className="flex flex-wrap gap-1.5">
            {restaurant.tags.map((t) => (
              <span key={t} className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">{restaurant.name}</h1>
          <p className="mt-2 text-lg italic text-muted-foreground">{restaurant.tagline}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm md:grid-cols-4">
            <div>
              <div className="flex items-center gap-1 font-semibold text-bone">
                <Star className="h-4 w-4 fill-saffron text-saffron" /> {restaurant.rating}
              </div>
              <div className="text-xs text-muted-foreground">{restaurant.reviews.toLocaleString()} reviews</div>
            </div>
            <div>
              <div className="flex items-center gap-1 font-semibold text-bone">
                <Clock className="h-4 w-4 text-ember" /> {restaurant.eta}
              </div>
              <div className="text-xs text-muted-foreground">delivery</div>
            </div>
            <div>
              <div className="flex items-center gap-1 font-semibold text-bone">
                <MapPin className="h-4 w-4 text-ember" /> {restaurant.distance}
              </div>
              <div className="text-xs text-muted-foreground">away</div>
            </div>
            <div>
              <div className="font-semibold text-bone">₹{restaurant.priceForTwo}</div>
              <div className="text-xs text-muted-foreground">for two</div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        {restaurant.menu.map((section) => (
          <div key={section.section} className="mb-12">
            <div className="mb-6 flex items-baseline gap-4">
              <h2 className="font-display text-3xl md:text-4xl">{section.section}</h2>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="space-y-3">
              {section.items.map((item) => {
                const inCart = cart.lines[item.id]?.qty ?? 0;
                return (
                  <div
                    key={item.id}
                    className="group flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-ember/40"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        {item.veg ? (
                          <Leaf className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-destructive" />
                        )}
                        <h3 className="font-display text-xl">{item.name}</h3>
                        {item.signature && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-saffron">
                            <Sparkles className="h-3 w-3" /> Signature
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="mt-2 font-mono text-sm text-bone">₹{item.price}</p>
                    </div>
                    <div className="shrink-0">
                      {inCart === 0 ? (
                        <button
                          onClick={() => cart.add(restaurant, item)}
                          className="inline-flex items-center gap-1 rounded-full bg-ember px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-2 rounded-full border border-ember bg-ember/10 px-2 py-1.5">
                          <button
                            onClick={() => cart.setQty(item.id, inCart - 1)}
                            className="rounded-full p-1 text-ember hover:bg-ember/20"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-5 text-center text-sm font-semibold text-bone">{inCart}</span>
                          <button
                            onClick={() => cart.add(restaurant, item)}
                            className="rounded-full p-1 text-ember hover:bg-ember/20"
                            aria-label="Increase"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Floating cart bar */}
      {cart.count > 0 && cart.restaurantId === restaurant.id && (
        <div className="sticky bottom-4 z-30 mx-auto w-full max-w-4xl px-4 md:px-6">
          <Link
            to="/cart"
            className="flex items-center justify-between gap-3 rounded-full bg-ember px-5 py-3 text-primary-foreground shadow-glow transition hover:opacity-95"
          >
            <span className="text-sm font-semibold">
              {cart.count} item{cart.count > 1 ? "s" : ""} · ₹{cart.subtotal}
            </span>
            <span className="text-sm font-semibold">View cart →</span>
          </Link>
        </div>
      )}
    </div>
  );
}
