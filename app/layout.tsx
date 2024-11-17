import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import Sidebar from "@/components/Sidebar";

import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";


import "./globals.css";
import Player from "@/components/Player";
import { Toaster } from "@/components/ui/toaster";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify",
  description: "Listen to music!",
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
          <ModalProvider />
          {/* <Sidebar songs={userSongs}> */}
          {children}
          {/* </Sidebar> */}
          <Player />
        </UserProvider>
        <Toaster />
      </body>
    </html >
  );
}
