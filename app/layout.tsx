import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acode Smart Wallet Verification",
  description: "Inspect and verify the deployment metadata for an Acode smart wallet."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
