import type { Metadata } from "next";
import { IBM_Plex_Sans_KR, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import { NavLink } from "@/components/NavLink";
import "./globals.css";

const plexKR = IBM_Plex_Sans_KR({
  variable: "--font-plex-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "책갈피",
  description: "읽고 듣고 본 기록을 쌓는 책갈피",
};

const NAV_ITEMS = [
  { href: "/", label: "내 기록" },
  { href: "/curation", label: "큐레이션 PRO" },
  { href: "/stats", label: "통계" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${plexKR.variable} ${plexMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg text-ink antialiased">
        <header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              📑 책갈피
            </Link>
            <nav className="flex gap-1 rounded-lg bg-surface-2 p-1">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-8">{children}</main>
      </body>
    </html>
  );
}
