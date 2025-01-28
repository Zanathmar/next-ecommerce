import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="flex h-screen">
      <form className="w-full md:w-3/4 flex flex-col justify-center items-center gap-4">
        <Link href="/">
            <Image src="/Lomrev.png" alt="Logo" width={350} height={300} className="hidden md:block w-3/2 object-cover" />
            <span>{Config.appName()}</span>
        </Link>

        <h1>Login</h1>
        <input type="email" id="email" name="email" placeholder="Enter your email" required />
        <input type="password" id="password" name="password" placeholder="Enter your password" required />
        <button type="submit">Enter!</button>
      </form>
      <Image src="/img1.jpg" alt="Login" width={400} height={500} />
    </div>
  );
}
