import type { Metadata } from "next";
import { Josefin_Sans } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "@/lib/Providers";

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Moynaa",
  description: "Connecting You To Trusted Care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${josefinSans.className} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}