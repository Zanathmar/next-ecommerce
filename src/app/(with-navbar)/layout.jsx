import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Fragment } from "react";

export default function Layout({ children }) {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  )
}
