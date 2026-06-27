import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLearn | 健身科学学习平台",
  description:
    "从解剖到周期化训练，系统掌握运动科学知识。面向健身爱好者与从业者的专业学习平台。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-[100dvh] flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
