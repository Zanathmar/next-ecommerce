import Image from "next/image";
import LogineForm from "./_partials/LogineForm";

export const metadata = {
  title: "Login",
};

export default function Login() {


  return (
    <div className="flex h-screen">
      <LogineForm />
      <Image src="/img1.jpg" alt="Login" width={400} height={500} />
    </div>
  );
}
