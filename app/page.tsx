"use client";
import { FaUsers, FaRunning, FaWallet, FaCog, FaSms } from "react-icons/fa";
import { useState } from "react";
import YeniKayitModal from "@/components/YeniKayitModal";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [athletes, setAthletes] = useState<{ id: number; name: string }[]>([
    { id: 1, name: "Ali Veli" },
    { id: 2, name: "Ahmet Yılmaz" },
    { id: 3, name: "Ayşe Demir" },
  ]);
  const [filteredAthletes, setFilteredAthletes] = useState<{ id: number; name: string }[]>([]);

  const handleSearch = () => {
    const results = athletes.filter((athlete) =>
      athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAthletes(results);
  };

  const handleAddAthlete = (newAthlete: { id: number; name: string }) => {
    setAthletes((prev) => [...prev, newAthlete]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-[#F6F6F4FB] min-h-screen">
      {/* Sayfa Başlığı */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Kulübünüzün yönetim paneline hoş geldiniz</h1>
        <p className="text-center text-gray-600"></p>
      </header>

      {/* Kısayol Butonları */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center space-x-2"
        >
          <FaUsers /> <span>Yeni Kayıt</span>
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2">
          <FaSms /> <span>SMS Gönder</span>
        </button>
      </div>

      {/* Yeni Kayıt Modal */}
      {isModalOpen && (
        <YeniKayitModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddAthlete} // Yeni sporcu ekleme
        />
      )}

      {/* Sporcu Arama */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Sporcu Ara"
            className="border border-gray-300 p-2 rounded-lg flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
          >
            Ara
          </button>
        </div>

        {/* Sporcu Listesi */}
        {filteredAthletes.length > 0 && (
          <ul className="mt-4 bg-white p-4 rounded-lg shadow-md">
            {filteredAthletes.map((athlete) => (
              <li key={athlete.id} className="py-2 border-b">
                {athlete.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Butonlar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <button className="bg-green-500 text-white p-6 rounded-lg flex flex-col items-center hover:bg-green-600 transition-all duration-200">
          <FaUsers className="text-3xl mb-2" /> <span>Sporcular</span>
        </button>
        <button className="bg-blue-500 text-white p-6 rounded-lg flex flex-col items-center hover:bg-blue-600 transition-all duration-200">
          <FaRunning className="text-3xl mb-2" /> <span>Antremanlar</span>
        </button>
        <button className="bg-red-500 text-white p-6 rounded-lg flex flex-col items-center hover:bg-red-600 transition-all duration-200">
          <FaWallet className="text-3xl mb-2" /> <span>Aidatlar</span>
        </button>
        <button className="bg-purple-500 text-white p-6 rounded-lg flex flex-col items-center hover:bg-purple-600 transition-all duration-200">
          <FaCog className="text-3xl mb-2" /> <span>Genel Ayarlar</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
