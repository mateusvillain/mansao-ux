import type { Metadata, Viewport } from "next";

import { IdentityGate } from "@/components/identity/IdentityGate";
import { IdentityProvider } from "@/components/identity/IdentityProvider";
import { BottomNav } from "@/components/nav/BottomNav";

import "./globals.css";

export const metadata: Metadata = {
  title: "Mansão UX",
  description: "A casa compartilhada do UX Conf — infos, perfis, recados e playlist.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#b43c2d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <IdentityProvider>
          <IdentityGate>
            {children}
            <BottomNav />
          </IdentityGate>
        </IdentityProvider>
      </body>
    </html>
  );
}
