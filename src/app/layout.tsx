import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.scss";
import styles from "./layout.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import { Providers } from "./providers";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gestão de Alunos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Providers>
          <div className={styles.container}>
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
