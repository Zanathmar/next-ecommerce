"use client";
import CustomInput from "@/components/CustomInput";
import FilledButton from "@/components/FilledButton";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LogineForm() {
    const [obscurePassword, setObscurePassword] = useState(true);
  return (
    <form className="w-full md:w-3/4 flex flex-col justify-center items-center gap-4">
      <Link href="/" className="items-center gap-2">
        <Image
          src="/Lomrev.png"
          alt="Logo"
          width={350}
          height={300}
          className="w-50"
        />

        <span className="font-teko text-4x1 font-bold">{Config.appName()}</span>
      </Link>
      <div className="h-px w-1/2 bg-black"></div>
      <h1 className="text-2x1 font-bold">Login</h1>
      <CustomInput
        type="email"
        id="email"
        name="email"
        placeholder="Enter your Email!!..."
        required={true}
        className={"w-2/3"}
      />
      <CustomInput
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password!!..."
        required={true}
        className={"w-2/3"}
      />
      <FilledButton type="submit" className={"w-2/3"}>
        Login
      </FilledButton>
      <p className="text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold hover:underline">
          {" "}
          Register{" "}
        </Link>
      </p>
    </form>
  );
}
