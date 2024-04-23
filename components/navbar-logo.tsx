"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NavbarLogo = () => {
  const router = useRouter();

  return (
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
  );
};

export default NavbarLogo;