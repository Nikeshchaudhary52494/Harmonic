import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import UserProvider from "@/components/provider/UserProvider";
import ModalProvider from "@/components/provider/ModalProvider";


import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SocketProvider } from "@/components/provider/socketProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harmonic",
  description: "Listen to your favourate music!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={font.className}>
        <UserProvider>
          <SocketProvider>
            <ModalProvider />
            {children}
            <Toaster />
          </SocketProvider>
        </UserProvider>
      </body>
    </html >
  );
}
