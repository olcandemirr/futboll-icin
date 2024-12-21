// components/Header.tsx
import { FaSignOutAlt } from "react-icons/fa";
import { useClub } from "@/app/contexts/ClubContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { selectedClub, setSelectedClub } = useClub();
  const router = useRouter(); // Next.js router kullanımı

  const handleLogout = () => {
    // Kulüp seçimini sıfırla veya diğer temizleme işlemleri
    setSelectedClub(""); 
    // Giriş ekranına yönlendir
    router.push("/giris");
  };

  return (
    <header className="bg-[#FCFCF9FF] shadow-md flex items-center justify-between p-4">
      {/* Kulüp Seçimi */}
      <div className="flex items-center space-x-4">
        <label htmlFor="club-select" className="text-gray-800 font-medium">
          Kulüp Seçimi:
        </label>
        <select
          id="club-select"
          value={selectedClub}
          onChange={(e) => setSelectedClub(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg"
        >
          <option value="Kulüp A">Kulüp A</option>
          <option value="Kulüp B">Kulüp B</option>
          <option value="Kulüp C">Kulüp C</option>
        </select>
      </div>

      {/* Kulüp Adı */}
      <h1 className="text-2xl font-bold text-center w-full text-gray-800">
        {selectedClub}
      </h1>

      {/* Çıkış Butonu */}
      <button
        onClick={handleLogout} // Çıkış işlemini tetikleyen fonksiyon
        className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 flex items-center justify-center transition-all duration-300"
      >
        <FaSignOutAlt className="mr-2" /> Çıkış
      </button>
    </header>
  );
};

export default Header;
