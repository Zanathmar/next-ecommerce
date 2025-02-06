import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Company Info */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icon.svg" alt="GoShop Logo" width={40} height={40} />
            <span className="text-2xl font-bold text-white">GoShop</span>
          </Link>
          <p className="mt-3 text-sm">Your trusted eCommerce platform for quality products and fast delivery.</p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-white font-semibold mb-2">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categories/electronics" className="hover:text-white">Electronics</Link></li>
              <li><Link href="/categories/fashion" className="hover:text-white">Fashion</Link></li>
              <li><Link href="/categories/home" className="hover:text-white">Home & Living</Link></li>
              <li><Link href="/categories/sports" className="hover:text-white">Sports</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help-center" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
              <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
              <li><Link href="/shipping" className="hover:text-white">Shipping</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-white font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank"><FaFacebook className="text-xl hover:text-blue-500" /></Link>
            <Link href="https://instagram.com" target="_blank"><FaInstagram className="text-xl hover:text-pink-500" /></Link>
            <Link href="https://twitter.com" target="_blank"><FaTwitter className="text-xl hover:text-blue-400" /></Link>
            <Link href="https://youtube.com" target="_blank"><FaYoutube className="text-xl hover:text-red-500" /></Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} GoShop. All rights reserved.
      </div>
    </footer>
  );
}