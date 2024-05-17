import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "./components/Nav";
import { AuthProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>
          Free2Play
        </title>
        <meta
          name="description"
          content="A list of free-to-play games"
          key="desc"
        />
      </Head>
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
