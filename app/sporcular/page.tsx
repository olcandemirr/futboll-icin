"use client";
import React, { useState } from "react";
import YeniKayitModal from "@/components/YeniKayitModal";
import YeniGrupModal from "@/components/YeniGrupModal";
import Image from "next/image";

const SporcularPage = () => {
  const [durum, setDurum] = useState("Aktif");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isYeniGrupModalOpen, setIsYeniGrupModalOpen] = useState(false);
  const [sporcular, setSporcular] = useState([
    {
      ad: "Olcan Demir",
      durum: "Aktif",
      id: 1001,
      resim: "/olcan.png",
      bilgi: "Yağız, futbol takımında bir kaptandır. 3 yıldır aktif sporcudur.",
    },
    {
      ad: "Murat Aydın",
      durum: "Pasif",
      id: 1002,
      resim: "/images/murat.jpg",
      bilgi: "Murat, yüzme branşında uzmanlaşmıştır. Şu anda aktif değil.",
    },
    {
      ad: "Selin Yılmaz",
      durum: "Ön Kayıt",
      id: 1003,
      resim: "/images/selin.jpg",
      bilgi: "Selin, ön kayıt sürecindedir ve voleybol takımına katılmayı planlıyor.",
    },
  ]);
  const [gruplar, setGruplar] = useState<{ ad: string; kisiler: string[] }[]>([]);
  const [aktifGrup, setAktifGrup] = useState<{ ad: string; kisiler: string[] } | null>(null);
  const [mesaj, setMesaj] = useState("");
  const [sporcuAra, setSporcuAra] = useState("");
  const [hoveredSporcu, setHoveredSporcu] = useState<null | string>(null);

  const telefonDefteri: { [key: string]: string } = {
    "Yağız Çelik": "5551234567",
    "Murat Aydın": "5338532521",
    "Selin Yılmaz": "5556543210",
  };

  const filtrelenmisSporcular = sporcular.filter(
    (sporcu) =>
      sporcu.ad.toLowerCase().includes(sporcuAra.toLowerCase()) &&
      sporcu.durum === durum
  );

  // Arama boşsa tüm sporcuları göster
  const gosterilecekSporcular =
    sporcuAra.trim() === "" ? sporcular.filter((sporcu) => sporcu.durum === durum) : filtrelenmisSporcular;

  const handleGrupEkle = (grupAdi: string, secilenKisiler: string[]) => {
    setGruplar((prev) => [...prev, { ad: grupAdi, kisiler: secilenKisiler }]);
    setIsYeniGrupModalOpen(false); // Modal'ı kapat
  };

  const handleYeniSporcuKaydet = (newAthlete: {
    id: number;
    name: string;
    gender: string;
    branch: string;
    contact: { relation: string; phone: string };
  }) => {
    setSporcular((prev) => [
      ...prev,
      {
        ad: newAthlete.name,
        durum: "Aktif", // Varsayılan durum
        id: newAthlete.id,
        resim: "/images/default.jpg", // Varsayılan resim
        bilgi: `${newAthlete.name} yeni bir sporcudur ve ${newAthlete.branch} branşında kayıtlıdır.`,
      },
    ]);
    setIsModalOpen(false); // Modal'ı kapat
  };

  const handleSmsGonder = () => {
    if (aktifGrup && mesaj.trim() !== "") {
      const telefonlar = aktifGrup.kisiler.map(
        (kisi) => telefonDefteri[kisi] || "Bilinmiyor"
      );
      alert(`Mesaj Gönderildi:\nTelefonlar: ${telefonlar.join(", ")}`);
      setMesaj("");
    } else {
      alert("Lütfen bir mesaj yazın ve grup seçin.");
    }
  };

  return (
    <div className="flex h-full">
      {/* Sol Sidebar */}
      <aside className="w-64 bg-gray-50 border-r p-4">
        <h2 className="text-xl font-bold mb-6">Sporcular</h2>
        <ul className="space-y-4">
          {["Kayıt", "Ön Kayıt", "Aktif", "Pasif"].map((durumTipi) => (
            <li
              key={durumTipi}
              onClick={() => setDurum(durumTipi)}
              className="flex items-center justify-between hover:bg-gray-100 p-2 rounded cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    durumTipi === "Kayıt"
                      ? "bg-purple-500"
                      : durumTipi === "Ön Kayıt"
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
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Yeni Kayıt
          </button>
          <button
            onClick={() => setIsYeniGrupModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Yeni Grup
          </button>
          <input
            type="text"
            placeholder="Ara"
            value={sporcuAra}
            onChange={(e) => setSporcuAra(e.target.value)}
            className="border p-2 rounded w-64"
          />
        </div>

        {/* Sporcular */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sporcular:</h3>
          {gosterilecekSporcular.length > 0 ? (
            gosterilecekSporcular.map((sporcu) => (
              <div
                key={sporcu.id}
                onMouseEnter={() => setHoveredSporcu(sporcu.ad)}
                onMouseLeave={() => setHoveredSporcu(null)}
                className="relative p-4 border rounded hover:bg-gray-50 cursor-pointer"
              >
                {sporcu.ad}
                {hoveredSporcu === sporcu.ad && (
                  <div className="absolute top-0 left-20 w-64 bg-white shadow-lg p-4 rounded-lg z-10">
                    <Image
                      src={sporcu.resim}
                      alt={sporcu.ad}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full mx-auto mb-4"
                    />
                    <h4 className="text-lg font-bold text-center">{sporcu.ad}</h4>
                    <p className="text-sm text-gray-600 text-center">
                      {sporcu.bilgi}
                    </p>
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Durum: {sporcu.durum}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Sonuç bulunamadı.</p>
          )}
        </div>

        {/* Gruplar */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Gruplar:</h3>
          {gruplar.length > 0 ? (
            gruplar.map((grup, index) => (
              <div
                key={index}
                onClick={() => setAktifGrup(grup)}
                className="p-4 border rounded hover:bg-gray-100 cursor-pointer"
              >
                {grup.ad}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Henüz bir grup oluşturulmadı.</p>
          )}
        </div>

        {/* Aktif Grup ve Mesaj Gönderimi */}
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
              onClick={handleSmsGonder}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
            >
              Gönder
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <YeniKayitModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleYeniSporcuKaydet}
        />
      )}
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
