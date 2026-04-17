import { Link } from "@tanstack/react-router";
import { ShoppingBag, MapPin } from "lucide-react";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight">
            morsel<span className="text-ember">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
          <MapPin className="h-4 w-4 text-ember" />
          <span>Bandra West, Mumbai</span>
        </div>

        <Link
          to="/cart"
          className="relative inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-ember/60 hover:text-ember"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ember px-1.5 text-xs font-semibold text-primary-foreground">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
