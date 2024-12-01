
"use client";// components/Sidebar.tsx
import Link from "next/link";
import { FaUsers, FaDumbbell, FaMoneyBill, FaCogs } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="h-screen w-20 bg-gray-800 text-white flex flex-col transition-all duration-300 hover:w-64">
      {/* Kullanıcı Bilgisi */}
      <div className="flex flex-col items-center py-6">
        
        <div className="w-16 h-16 bg-gray-500 rounded-full mb-2" />
        <p className="text-sm text-center">Behçet Arım</p>
      </div>

      {/* Menü */}
      <div className="flex-1 flex flex-col items-center space-y-4 py-6">
        <Link href="/sporcular" className="group w-full">
          <div className="flex items-center justify-start space-x-4 px-4 py-2 group-hover:bg-gray-700 transition-all duration-300">
            <FaUsers className="text-xl group-hover:scale-125 transition-transform" />
            <span className="hidden group-hover:block">Sporcular</span>
          </div>
        </Link>
        <Link href="/antermanlar" className="group w-full">
          <div className="flex items-center justify-start space-x-4 px-4 py-2 group-hover:bg-gray-700 transition-all duration-300">
            <FaDumbbell className="text-xl group-hover:scale-125 transition-transform" />
            <span className="hidden group-hover:block">Antrenmanlar</span>
          </div>
        </Link>
        <Link href="/aidatlar" className="group w-full">
          <div className="flex items-center justify-start space-x-4 px-4 py-2 group-hover:bg-gray-700 transition-all duration-300">
            <FaMoneyBill className="text-xl group-hover:scale-125 transition-transform" />
            <span className="hidden group-hover:block">Aidatlar</span>
          </div>
        </Link>
        <Link href="/genel-ayarlar" className="group w-full">
          <div className="flex items-center justify-start space-x-4 px-4 py-2 group-hover:bg-gray-700 transition-all duration-300">
            <FaCogs className="text-xl group-hover:scale-125 transition-transform" />
            <span className="hidden group-hover:block">Genel Ayarlar</span>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
