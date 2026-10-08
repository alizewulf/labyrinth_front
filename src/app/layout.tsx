import type { Metadata } from "next";
import "./globals.css";
import Header from "@/widgets/header";
import StoreProvider from "./providers/StoreProvider";

export const metadata: Metadata = {
  title: {
    default: "Labyrinth",
    template: "%s | Labyrinth",
  },
  description: "Online clinic appointment booking platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`antialiased`}>
      <body className="min-h-full">
        <Header />
        <StoreProvider>
          <main className="flex flex-1 flex-col px-6 py-16 sm:py-24">
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
