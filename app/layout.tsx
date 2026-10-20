import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Taskmanager | Make room for what matters", description: "Your classes, projects, and everyday tasks. One clear place to start." };
export default function RootLayout({children}: {children: React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
