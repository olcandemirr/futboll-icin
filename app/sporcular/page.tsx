"use client";

import React, { useState, useEffect } from "react";
import YeniKayitModal from "@/components/YeniKayitModal";
import YeniGrupModal from "@/components/YeniGrupModal";
import { useClub } from "@/app/contexts/ClubContext";
import { FaExchangeAlt } from "react-icons/fa";
import Image from "next/image";

type Sporcu = {
  id: number;
  name: string;
  gender: string;
  branch: string;
  phone: string;
  durum: string;
  contact: { relation: string; phone: string; role: string }[];
  kulup: string;
};

const SporcularPage = () => {
  const { selectedClub } = useClub(); // Seçili kulüp bilgisi
  const [durum, setDurum] = useState("Aktif");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isYeniGrupModalOpen, setIsYeniGrupModalOpen] = useState(false);
  const [sporcular, setSporcular] = useState<Sporcu[]>([]);
  const [gruplar, setGruplar] = useState<{ ad: string; kisiler: string[] }[]>([]);
  const [aktifGrup, setAktifGrup] = useState<{ ad: string; kisiler: string[] } | null>(null);
  const [mesaj, setMesaj] = useState(""); // Mesaj içeriği
  const filteredSporcular = sporcular.filter((sporcu) => sporcu.kulup === selectedClub);

  const durumlar = ["Ön Kayıt", "Aktif", "Pasif"];

  useEffect(() => {
    fetch("/api/sporcu")
      .then((res) => res.json())
      .then((data) => setSporcular(data))
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);
  

  // Yeni sporcu ekleme
  const handleSave = async (newAthlete: {
    id: number;
    name: string;
    gender: string;
    branch: string;
    phone: string;
    durum: string;
    contact: { relation: string; phone: string; role: string }[];
  }) => {
    try {
      // Kulüp bilgisi ekleniyor
      const athleteWithClub = { ...newAthlete, kulup: selectedClub };
  
      const response = await fetch(`/api/sporcu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(athleteWithClub),
      });
  
      if (response.ok) {
        const yeniSporcu = await response.json();
        setSporcular((prev) => [...prev, yeniSporcu]);
        setIsModalOpen(false);
      } else {
        console.error("Yeni sporcu eklenirken hata oluştu.");
      }
    } catch (error) {
      console.error("Yeni sporcu eklenirken hata:", error);
    }
  };
  

  // Grup ekleme işlemi
  const handleGrupEkle = (grupAdi: string, secilenKisiler: string[]) => {
    setGruplar((prev) => [
      ...prev,
      {
        ad: grupAdi,
        kisiler: secilenKisiler,
      },
    ]);
    setIsYeniGrupModalOpen(false);
  };

  // Sporcu taşıma
  const handleTasima = (sporcuId: number, yeniDurum: string) => {
    setSporcular((prev) =>
      prev.map((sporcu) =>
        sporcu.id === sporcuId ? { ...sporcu, durum: yeniDurum } : sporcu
      )
    );
  };

  // Mesaj gönderme
  const handleMesajGonder = () => {
    if (aktifGrup && mesaj.trim() !== "") {
      alert(`Mesaj Gönderildi: Grup: ${aktifGrup.ad}, İçerik: ${mesaj}`);
      setMesaj("");
    } else {
      alert("Lütfen bir grup seçin ve mesaj yazın.");
    }
  };

  return (
    <div className="flex h-full">
      {/* Sol Sidebar */}
      <aside className="w-64 bg-gray-50 border-r p-4">
        <h2 className="text-xl font-bold mb-6">Sporcular</h2>
        <ul className="space-y-4">
          {durumlar.map((durumTipi) => (
            <li
              key={durumTipi}
              onClick={() => setDurum(durumTipi)}
              className={`flex items-center justify-between hover:bg-gray-100 p-2 rounded cursor-pointer ${
                durum === durumTipi ? "bg-gray-200 font-bold" : ""
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    durumTipi === "Ön Kayıt"
                      ? "bg-yellow-500"
                      : durumTipi === "Aktif"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></span>
                <span className="text-sm font-medium">{durumTipi}</span>
              </span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Sağ İçerik */}
      <div className="flex-1 p-6">
        {/* Yeni Kayıt ve Grup Ekle Butonları */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Yeni Kayıt Ekle
          </button>
          <button
            onClick={() => setIsYeniGrupModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Yeni Grup Ekle
          </button>
        </div>

        {/* Sporcu Listesi */}
        <h3 className="text-lg font-bold mb-4">
          {selectedClub} - {durum} Durumundaki Sporcular
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sporcular
            .filter((sporcu) => sporcu.kulup === selectedClub && sporcu.durum === durum)
            .map((sporcu) => (
              <div
                key={sporcu.id}
                className="relative bg-white p-4 rounded shadow hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/default.jpg"
                    alt={sporcu.name}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold">{sporcu.name}</h4>
                    <p className="text-sm text-gray-600">
                      Branş: {sporcu.branch}, Telefon: {sporcu.phone}
                    </p>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => {
                      const yeniDurum = prompt(
                        `Sporcuyu hangi duruma taşımak istiyorsunuz? (${durumlar.join(", ")})`
                      );
                      if (yeniDurum && durumlar.includes(yeniDurum)) {
                        handleTasima(sporcu.id, yeniDurum);
                      } else if (yeniDurum) {
                        alert("Geçersiz bir durum seçtiniz.");
                      }
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaExchangeAlt />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Gruplar */}
        <h3 className="text-lg font-bold mt-8">Gruplar</h3>
        <div className="mt-4">
          {gruplar.length > 0 ? (
            gruplar.map((grup, index) => (
              <div
                key={index}
                onClick={() => setAktifGrup(grup)}
                className={`p-4 border rounded mb-4 cursor-pointer ${
                  aktifGrup?.ad === grup.ad ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
              >
                <h4 className="font-bold">{grup.ad}</h4>
                <p className="text-sm text-gray-600">
                  Kişiler: {grup.kisiler.join(", ")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Henüz bir grup oluşturulmadı.</p>
          )}
        </div>

        {/* Mesaj Gönderme */}
        {aktifGrup && (
          <div className="mt-6">
            <h4 className="text-lg font-bold">Mesaj Gönder: {aktifGrup.ad}</h4>
            <textarea
              className="w-full border p-2 rounded"
              value={mesaj}
              onChange={(e) => setMesaj(e.target.value)}
              placeholder="Mesajınızı buraya yazın..."
            ></textarea>
            <button
              onClick={handleMesajGonder}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
            >
              Gönder
            </button>
          </div>
        )}
      </div>

      {/* Yeni Kayıt Modal */}
      {isModalOpen && (
        <YeniKayitModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Yeni Grup Modal */}
      {isYeniGrupModalOpen && (
        <YeniGrupModal
          onClose={() => setIsYeniGrupModalOpen(false)}
          onGrupEkle={handleGrupEkle}
        />
      )}
    </div>
  );
};

export default SporcularPage;
