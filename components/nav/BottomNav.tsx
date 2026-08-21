"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Casa", icon: "🏡" },
  { href: "/perfis", label: "Perfis", icon: "👋" },
  { href: "/recados", label: "Recados", icon: "📌" },
  { href: "/playlist", label: "Playlist", icon: "🎵" },
] as const;

/**
 * Navegação fixa no rodapé: alcançável com o polegar em uso de uma mão,
 * que é como o app vai ser usado durante a casa (#13).
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Seções da casa"
      className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-surface/95 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-md">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex min-h-nav flex-col items-center justify-center gap-0.5 text-xs",
                  active ? "font-semibold text-brand" : "text-muted",
                ].join(" ")}
              >
                <span aria-hidden className="text-lg">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
