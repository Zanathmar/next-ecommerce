import Image from "next/image";
import LogineForm from "./_partials/LogineForm";

export const metadata = {
  title: "Login",
};

export default function Login() {


  return (
    <div className="flex h-screen">
      <LogineForm />
      <Image src="/lomk.png" alt="Login" width={960} height={100} />
    </div>
  );
}
