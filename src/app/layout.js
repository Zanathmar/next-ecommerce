import Config from "@/core/config";
import "./globals.css";

export const metadata = {
  title: {
    default: Config.appName(),
    template: "%s" | + Config.appName(),
  },  
  description: Config.appName() + " is a modern web application.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        </body>
    </html>
  );
}
