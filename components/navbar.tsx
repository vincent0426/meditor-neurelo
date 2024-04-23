"use client";

import { Users } from "neurelo-sdk";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

import { UserDropDown } from "./user-drop-down";

const Navbar = ({ className, user }: { className?: string; user: Users | null }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/auth/login";
  
  if (isLoginPage) {
    return null;
  }

  return (
    <div className={cn("max-w-5xl mx-auto flex justify-between", className)}>
      <div className="flex cursor-pointer items-center space-x-4" onClick={() => router.push("/")}>
        <div className="bg-black p-1">
          <Image
            src="/logo.png"
            alt="Meditor"
            width={20}
            height={20}
          />
        </div>
        <h2 className="font-mono text-3xl font-bold">
          Meditor
        </h2>
      </div>
      {user ? (
        <UserDropDown user={user} />
      ) : (
        <button className="relative p-[3px]" onClick={() => router.push("/auth/login")}>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
          <div className="group relative rounded-[6px] bg-white  px-8 py-2 text-black transition duration-200 hover:bg-transparent hover:text-white">
            Login to publish
          </div>
        </button>
      )}
    </div>
  );
};

export default Navbar;