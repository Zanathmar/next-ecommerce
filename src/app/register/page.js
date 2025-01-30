import Image from "next/image";
import RegisterForm from "./_partials/RegisterForm";

export const metadata = {
  title: "Register",
};

export default function Register() {


  return (
    <div className="flex h-screen bg-">
      <RegisterForm />
      <Image src="/lomregis.png" alt="Register" width={960} height={100} />
    </div>
  );
}