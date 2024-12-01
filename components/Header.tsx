// components/Header.tsx
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-[#FCFCF9FF] shadow-md flex items-center justify-between p-4">
      {/* Kulüp Adı */}
      <h1 className="text-2xl font-bold text-center w-full text-gray-800">
      Kulup adı
      </h1>

      {/* Çıkış Butonu */}
      <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 flex items-center justify-center transition-all duration-300">
        <FaSignOutAlt className="mr-2" /> Çıkış
      </button>
    </header>
  );
};

export default Header;
