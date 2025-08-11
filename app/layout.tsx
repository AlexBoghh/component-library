import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/hooks/use-theme";
import { ThemeCustomizerTrigger } from "@/components/theme-customizer";
import { Navigation } from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radix UI Lab",
  description: "A modern component library built with Radix UI and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark', background: '#0a0a0f' }} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full min-h-screen font-sans antialiased`}
        style={{ background: '#0a0a0f', color: '#f2f2f2' }}
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col" style={{ background: '#0a0a0f' }}>
            <Navigation />
            <div className="absolute right-4 top-4 z-[45]">
              <ThemeCustomizerTrigger />
            </div>
            <main className="flex-1" style={{ background: '#0a0a0f' }}>{children}</main>
            <footer className="border-t border-[#2a2a33] py-6 md:py-0" style={{ background: '#0a0a0f' }}>
              <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:h-24 md:flex-row md:px-6">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Built with Radix UI and Tailwind CSS. Powered by an integrated component system.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
