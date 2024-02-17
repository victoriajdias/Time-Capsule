import "./globals.css";
import type { Metadata } from "next";

import { ReactNode } from "react";

import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamJuree,
} from "next/font/google";

import { Copyright } from "@/src/components/Copyright";
import { Hero } from "@/src/components/Hero";
import { SignIn } from "../components/SignIn";
import { Profile } from "@/src/components/Profile";
import { cookies } from "next/headers";


const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const baiJamjuree = BaiJamJuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
});

export const metadata: Metadata = {
  title: "NLW Spacetime",
  description:
    "Uma cápsula do tempo construída com React, Next.js, TailWindCSS e TypeScript",
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  const isAuthenticated = cookies().has('token')
  
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable}
       font-sans bg-gray-900 text-gray-100`}
      >

        <main className="grid grid-cols-2 min-h-screen">
            {/* left */}
              <div className="relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden border-r bg-[url(../assets/bg-stars.svg)] bg-cover border-white/10">
                {/* blur */}
                <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
              
                {/* stripes */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-stripes " />

                {isAuthenticated ? <Profile /> : <SignIn />}
                <Hero />
                <Copyright />
              </div>

              <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover ">
                {children}
              </div>
        </main>
      </body>
    </html>
  );
}
