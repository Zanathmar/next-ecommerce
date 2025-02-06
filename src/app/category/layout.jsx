import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Fragment } from "react";

export default function Layout({ children }) {
  return (
    <Fragment>
      <Navbar />
      <main className="container mx-auto px-4 py-6">{children}</main>
      <Footer />
    </Fragment>
  );
}