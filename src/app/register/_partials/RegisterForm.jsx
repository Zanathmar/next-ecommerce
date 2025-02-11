"use client";
import CustomInput from "@/components/CustomInput";
import FilledButton from "@/components/FilledButton";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FiAlertCircle } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [obscurePassword, setObscurePassword] = useState(true);
  const [obscureConfirmPassword, setObscureConfirmPassword] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toggleObscurePassword = () => setObscurePassword(!obscurePassword);
  const toggleObscureConfirmPassword = () => setObscureConfirmPassword(!obscureConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    //  Added Basic Validation Before API Call
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password and confirm password do not match.");
      setLoading(false);
      return;
    }
    // console.log(formData);
    try {
      const res = await fetch(Config.baseApiUrl() + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "", // ✅ Prevent undefined API key
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Registration failed!");
      }

      //  Reset Form After Successful Registration
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      localStorage.setItem("token", result.data?.token);
      router.push("/");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full md:w-1/2 flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit}>
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icon.svg" alt="Logo" width={100} height={100} />
        <span className="font-poppins text-4xl font-bold">
          {Config.appName()}
        </span>
      </Link>
      <div className="h-px w-1/2 bg-dark"></div>
      <h1 className="text-2xl font-bold">Register</h1>
      {error && (
        <div className="flex items-center gap-2 text-red-500 bg-red-500/20 py-2 px-4 rounded text-sm border border-red-500 w2/3 mb-2">
          <FiAlertCircle className="shrink-0 text-lg" />
          {error}
        </div>
      )}

      <CustomInput
        type="text"
        id="name"
        name="name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        value={formData.name}
        placeholder="Enter your username"
        required
        className={"w-2/3"}
      />

      <CustomInput
        type="email"
        id="email"
        name="email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        value={formData.email}
        placeholder="Enter your email"
        required
        className={"w-2/3"}
      />

      <div className="w-2/3 relative">
        <CustomInput
          type={obscurePassword ? "password" : "text"}
          id="password"
          name="password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          value={formData.password}
          placeholder="Enter your password"
          required
          className={"w-full"}
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2"
          onClick={toggleObscurePassword}
        >
          {obscurePassword ? <IoMdEye /> : <IoMdEyeOff />}
        </button>
      </div>

      <div className="w-2/3 relative">
        <CustomInput
          type={obscureConfirmPassword ? "password" : "text"}
          id="confirmPassword"
          name="confirmPassword"
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          value={formData.confirmPassword}
          placeholder="Verify your password"
          required
          className={"w-full"}
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2"
          onClick={toggleObscureConfirmPassword}
        >
          {obscureConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
        </button>
      </div>

      <FilledButton
        type="submit"
        className={"w-2/3 disabled:bg-opacity-70"}
        disabled={loading}
      >
        {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Register"}
      </FilledButton>

      <p className="text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/login">
          <span className="font-bold text-yellow-600">Login</span>
        </Link>
      </p>
    </form>
  );
};