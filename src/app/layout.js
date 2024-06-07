import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tier List Maker",
  description: "Tier list maker",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en">
      <body className={`bg-background text-text ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
