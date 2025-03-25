import { AuroraBackground } from "@/components/ui/aurora-background";
import "./globals.css";

import Navbar from "@/components/ui/navbar";
import { BackgroundLines } from "@/components/ui/background-lines";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <AuroraBackground className="z-1">
          <BackgroundLines className="z-1">
            <Navbar />
            {children}
          </BackgroundLines>
        </AuroraBackground>
      </body>
    </html>
  );
}
