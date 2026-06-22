import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="flex gap-4 p-4 border-b">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/tasks">Tasks</Link>
          <Link href="/notes">Notes</Link>
          <Link href="/settings">Settings</Link>
        </nav>

        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}