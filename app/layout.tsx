"use client";
import '../styles/globals.css';
import { usePathname } from "next/navigation";
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { ClubProvider } from '@/app/contexts/ClubContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/giris"; // Giriş sayfasını kontrol et

  if (isLoginPage) {
    return (
      <html lang="tr">
        <body className="bg-[#F1F1F1FF]">
          <main className="p-6 text-gray-800">{children}</main>
        </body>
      </html>
    );
  }

  return (
    <html lang="tr">
      <body className="bg-[#F1F1F1FF]">
        <ClubProvider>
          <div className="flex">
            <Sidebar />
            <div className="flex-grow">
              <Header />
              <main className="p-6 text-gray-800">{children}</main>
            </div>
          </div>
        </ClubProvider>
      </body>
    </html>
  );
}
