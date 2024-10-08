import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sports Sim",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={nunito.className}>
          <main className="flex flex-col">
            <Navbar />
            {children}
            <Footer />
          </main>
        </body>
      </html>
    </SessionProvider>
  );
}
