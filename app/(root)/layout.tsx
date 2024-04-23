import "@/styles/globals.css";

import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";

import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import getCurrentUser from "@/lib/session";

const ptSerif = PT_Serif({ 
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Meditor",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  
  return (
    <html lang="en">
      <body className={ptSerif.className}>
        <Navbar className="mt-6" user={user} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
