"use client";
import CustomInput from "@/components/CustomInput";
import FilledButton from "@/components/FilledButton";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";

export default function RegisterForm() {
  const [obscurePassword, setObscurePassword] = useState(true);
  const [ConfirmPassword, setConfirmPassword] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleObcurePassword = () => {
    setObscurePassword(!obscurePassword);
  };
  const toggleConfirmPassword = () => {
    setConfirmPassword(!ConfirmPassword);
  };

  const handlesSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
  }

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
      <div className="h-px w-2/3 bg-black"></div>
      <h1 className="text-3x1 font-bold">Register</h1>
      {error && (
        <div className="flex items-center gap-2 text-red-500 bg-red-500/20 py-2 px-4 rounded text-sm border border-red-500 w-2/3 mb-2">
          <CiCircleAlert className="shrink-0 text-lg" />
          {error}
        </div>
      )}
      <CustomInput
        type="name"
        id="name"
        name="name"
        placeholder="Enter your Nikname/Full Namel!!..."
        required={true}
        className={"w-2/3"}
      />
      <CustomInput
        type="email"
        id="email"
        name="email"
        placeholder="Enter your Email!!..."
        required={true}
        className={"w-2/3"}
      />
      <div className="w-2/3 relative">
        <CustomInput
          type={obscurePassword ? "password" : "text"}
          id="confirmpassword"
          name="confirmpassword"
          placeholder="Enter your password!!..."
          required={true}
          className={"w-full"}
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2"
          onClick={toggleObcurePassword}
        >
          {obscurePassword ? "Show" : "Hide"}
        </button>
      </div>

      <div className="w-2/3 relative">
        <CustomInput
          type={ConfirmPassword ? "password" : "text"}
          id="password"
          name="password"
          placeholder="Confirm your Password!!..."
          required={true}
          className={"w-full"}
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2"
          onClick={toggleConfirmPassword}
        >
          {ConfirmPassword ? "Show" : "Hide"}
        </button>
      </div>
      <FilledButton
        type="submit"
        className={"w-2/3 disabled:bg-opacity-70"}
        disabled={loading}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-x1" />
        ) : (
          <IoMdLogIn className="text-2x1" />
        )}
        Register
      </FilledButton>
      <p className="text-sm">
        Do you have an account?{" "}
        <Link href="/login" className="font-semibold hover:underline">
          {" "}
          Login{" "}
        </Link>
      </p>
    </form>
  );
}
