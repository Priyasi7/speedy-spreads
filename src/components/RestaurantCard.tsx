import { Link } from "@tanstack/react-router";
import { Star, Clock } from "lucide-react";
import type { Restaurant } from "@/data/restaurants";

export function RestaurantCard({ restaurant, eager = false }: { restaurant: Restaurant; eager?: boolean }) {
  return (
    <Link
      to="/r/$id"
      params={{ id: restaurant.id }}
      className="group relative block overflow-hidden rounded-2xl bg-gradient-card shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          loading={eager ? "eager" : "lazy"}
          width={1024}
          height={768}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-noir" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {restaurant.tags.slice(0, 1).map((t) => (
            <span
              key={t}
              className="rounded-full bg-ember/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <h3 className="font-display text-2xl leading-tight text-bone">{restaurant.name}</h3>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-background/70 px-2 py-1 text-xs font-semibold text-bone backdrop-blur">
            <Star className="h-3 w-3 fill-saffron text-saffron" />
            {restaurant.rating}
          </div>
        </div>
      </div>
      <div className="space-y-2 p-4">
        <p className="line-clamp-1 text-sm italic text-muted-foreground">{restaurant.tagline}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {restaurant.eta}
          </span>
          <span>₹{restaurant.priceForTwo} for two</span>
          <span>{restaurant.distance}</span>
        </div>
      </div>
    </Link>
  );
}
