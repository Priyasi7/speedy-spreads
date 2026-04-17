import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-semibold text-foreground">404</h1>
        <h2 className="mt-4 font-display text-2xl text-foreground">Off the menu</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This dish doesn't exist. Try something else.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Back to kitchen
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Morsel — Editorial food, delivered" },
      { name: "description", content: "Late-night ramen, omakase, smash burgers and slow-cooked dal — delivered with care." },
      { name: "author", content: "Morsel" },
      { property: "og:title", content: "Morsel — Editorial food, delivered" },
      { property: "og:description", content: "Late-night ramen, omakase, smash burgers and slow-cooked dal — delivered with care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Morsel — Editorial food, delivered" },
      { name: "twitter:description", content: "Late-night ramen, omakase, smash burgers and slow-cooked dal — delivered with care." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );
}
