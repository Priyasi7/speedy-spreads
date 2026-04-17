import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Flame } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { RestaurantCard } from "@/components/RestaurantCard";
import { categories, restaurants } from "@/data/restaurants";
import heroPasta from "@/assets/hero-pasta.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Morsel — Editorial food, delivered" },
      { name: "description", content: "Discover restaurants curated for one thing: taste. Order in 25 minutes." },
    ],
  }),
});

function Index() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      const matchCat = active === "all" || r.cuisine === active;
      const q = query.trim().toLowerCase();
      const matchQ = !q || r.name.toLowerCase().includes(q) || r.tagline.toLowerCase().includes(q) || r.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [active, query]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0">
          <img
            src={heroPasta}
            alt="Truffle pasta with gold leaf"
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-ember">
              <Flame className="h-3 w-3" /> Tonight in Bandra
            </span>
            <h1 className="font-display text-5xl leading-[1.05] text-balance md:text-7xl">
              Food worth<br />
              <span className="italic text-ember">staying in</span> for.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              A handful of restaurants. Each one obsessed. Delivered to your door, still hot, still alive.
            </p>

            <div className="mt-8 flex max-w-md items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-3 backdrop-blur-xl focus-within:border-ember/60">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ramen, truffle, late-night…"
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 pt-10 md:px-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={
                  "rounded-full border px-4 py-2 text-sm font-medium transition " +
                  (isActive
                    ? "border-ember bg-ember text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-ember/50 hover:text-foreground")
                }
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Restaurants */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl md:text-4xl">
            {filtered.length} restaurants <span className="italic text-muted-foreground">tonight</span>
          </h2>
        </div>
        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
            Nothing matches. Try a different craving.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <RestaurantCard key={r.id} restaurant={r} eager={i < 3} />
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-border/60 py-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Morsel · Curated, not catalogued.
      </footer>
    </div>
  );
}
