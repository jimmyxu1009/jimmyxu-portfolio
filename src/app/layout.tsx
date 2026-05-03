import type { Metadata, Viewport } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "许英杰",
  description:
    "以好奇心驱动学习，以创造力探索 AI 的更多可能。AI 学习者、创意开发者、AI 工具实践者。",
  metadataBase: new URL("https://xuyingjie.com"),
  icons: {
    icon: [{ url: "/favicon/favicon.svg", type: "image/svg+xml" }, "/favicon/favicon.png"],
    apple: "/favicon/apple-icon.png",
  },
  openGraph: {
    title: "许英杰",
    description:
      "以好奇心驱动学习，以创造力探索 AI 的更多可能。AI 学习者、创意开发者、AI 工具实践者。",
    url: "https://xuyingjie.com",
    siteName: "许英杰",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "许英杰",
    description:
      "以好奇心驱动学习，以创造力探索 AI 的更多可能。AI 学习者、创意开发者、AI 工具实践者。",
    images: ["/images/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full bg-deep-900">
        <ClientLayout>
          <LenisProvider>{children}</LenisProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
