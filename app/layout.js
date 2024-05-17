import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "./components/Nav";
import { AuthProvider } from "./provider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Free2Play",
  description: "A database of free to play games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div>
            <Nav />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
