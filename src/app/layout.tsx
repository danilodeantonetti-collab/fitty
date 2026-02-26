import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { TimerProvider } from "@/context/TimerContext";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
    title: "Fitty — Your Workout Companion",
    description: "Track, lift, grow.",
    manifest: "/manifest.json",
    appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Fitty" },
    themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de" className={geist.variable}>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.svg" />
            </head>
            <body className="bg-background text-foreground antialiased">
                <TimerProvider>
                    {children}
                </TimerProvider>
                <script dangerouslySetInnerHTML={{ __html: `if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');` }} />
            </body>
        </html>
    );
}
