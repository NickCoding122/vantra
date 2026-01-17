import { Cormorant_Garamond, Montserrat } from "next/font/google";

export const vantraSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-vantra-serif",
});

export const vantraSans = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-vantra-sans",
});
