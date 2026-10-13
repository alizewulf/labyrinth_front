import type { Metadata } from "next";
import "./globals.css";
import Header from "@/widgets/header";
import StoreProvider from "./providers/StoreProvider";
import AuthProvider from "./providers/AuthProvider";

export const metadata: Metadata = {
  title: {
    default: "Labyrinth",
    template: "%s | Labyrinth",
  },
  description: "Online clinic appointment booking platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`antialiased`}>
      <body className="min-h-full">
        <Header />
        <StoreProvider>
          <AuthProvider>
            <main className="flex flex-1 flex-col">{children}</main>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
