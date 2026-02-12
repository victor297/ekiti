import "./globals.css";
import Providers from "./providers";
import { Poppins, Nunito } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"]
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"]
});

export const metadata = {
  title: "JSS 2 Math Explorer",
  description: "Interactive math learning with quizzes, videos, and progress tracking."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${nunito.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
