"use client";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };
  return (
    <header className="flex justify-between items-center px-6 py-5 sticky top-0 z-30 bg-white shadow">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/Logo.png"
          alt="logo"
          width={560}
          height={360}
          className="w-14"
        ></Image>
        <span className="font-Teko text-l font-bold ">
          {Config.appName()}
        </span>
      </Link>
      <nav className="text-3xl flex items-center gap-3">
        <Link href="/search">
          <CiSearch />
        </Link>
        <Link href="/cart">
          <FaCartPlus />
        </Link>
        <button type="button" onClick={toggleMenu}>
            <CgProfile />
        </button>
      </nav>

      <div className={"absolute flex flex-col gap-2 bg-white shadow top-20 right-4 py-4 min-w-40 rounded-md transition-all duration-300 ease-in-out " + (open ? "scale-y-100" : "scale-0 opacity-0")}>
        <Link href="/login" className="py-2 px-4 hover:bg-gray-100 text-start  "> Login </Link>
        <Link href="/register" className="py-2 px-4 hover:bg-gray-100 text-start  "> Register </Link>
        <Link href="/ImProfile" className="py-2 px-4 hover:bg-gray-100 text-start  "> Profile </Link> 
        <Link href="/order" className="py-2 px-4 hover:bg-gray-100 text-start  "> My order </Link>
        <button type="button" className="py-2 px-4 hover:bg-gray-100 text-start  "> Logout </button>
      </div>

    </header>
  );
}
