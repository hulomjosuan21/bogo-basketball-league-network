import type { Metadata } from "next";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
import {ThemeProvider} from "@/components/theme-provider";
import StoreProvider from "@/providers/store-provider";

export const metadata: Metadata = {
  title: "Bogo Basketball League Network",
  description: "Programmed by: Josuan Leonardo Hulom BSIT 3-A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <StoreProvider>
          <html lang="en" suppressHydrationWarning={true}>
          <body
              className={`antialiased`}
          >
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
              {children}
              <Toaster/>
          </ThemeProvider>
          </body>
          </html>
      </StoreProvider>
  );
}
