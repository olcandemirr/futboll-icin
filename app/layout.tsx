import '../styles/globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-[#F1F1F1FF]">
        <div className="flex">
          <Sidebar />
          <div className="flex-grow">
            <Header />
            <main className="p-6 text-gray-800">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
