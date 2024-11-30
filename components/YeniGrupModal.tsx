// components/YeniGrupModal.tsx
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const YeniGrupModal = ({ onClose, onGrupEkle }: { onClose: () => void, onGrupEkle: (grupAdi: string, secilenKisiler: string[]) => void }) => {
  const [grupAdi, setGrupAdi] = useState("");
  const [secilenKisiler, setSecilenKisiler] = useState<string[]>([]);

  const kisiler = [
    { id: 1, ad: "Yağız Çelik" },
    { id: 2, ad: "Murat Aydın" },
    { id: 3, ad: "Selin Yılmaz" },
    // Diğer kişiler
  ];

  const handleCheckboxChange = (id: string) => {
    setSecilenKisiler((prev) =>
      prev.includes(id) ? prev.filter((kisi) => kisi !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (grupAdi && secilenKisiler.length > 0) {
      onGrupEkle(grupAdi, secilenKisiler);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        {/* Başlık */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Yeni Grup Oluştur</h2>
          <button onClick={onClose} className="text-red-500">
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Grup Adı</label>
            <input
              type="text"
              value={grupAdi}
              onChange={(e) => setGrupAdi(e.target.value)}
              className="border p-2 w-full rounded"
              placeholder="Grup adı girin"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Kişi Seçimi</label>
            {kisiler.map((kisi) => (
              <div key={kisi.id} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id={String(kisi.id)}
                  onChange={() => handleCheckboxChange(String(kisi.id))}
                />
                <label htmlFor={String(kisi.id)}>{kisi.ad}</label>
              </div>
            ))}
          </div>
        </form>

        {/* Grup Oluştur Butonu */}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Grup Oluştur
        </button>
      </div>
    </div>
  );
};

export default YeniGrupModal;
