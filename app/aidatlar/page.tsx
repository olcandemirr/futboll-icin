"use client";
import React, { useState } from "react";

// Sporcu tipi
type Sporcu = {
  id: string;
  ad: string;
  dogumYili: string;
  aidatlar: string[];
  [key: string]: string | string[];
};

const Aidatlar = () => {
  // Örnek sporcu verisi
  const [sporcular, setSporcular] = useState<Sporcu[]>([
    {
      id: "1",
      ad: "Ahmet Yılmaz",
      dogumYili: "1995",
      aidatlar: [],
    },
    {
      id: "2",
      ad: "Mehmet Demir",
      dogumYili: "1990",
      aidatlar: [],
    },
  ]);

  // Yeni kolon ekleme
  const [kolonlar, setKolonlar] = useState<string[]>([]);

  // Kolon ekleme fonksiyonu
  const addColumn = () => {
    // Mevcut son ayı al, sonra bir sonraki ayı hesapla
    const lastMonth = kolonlar.length ? kolonlar[kolonlar.length - 1] : "2024/Ocak";
    const [year, month] = lastMonth.split("/"); // Örneğin: "2024", "Ocak"
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];

    // Sonraki ayı bul
    const currentMonthIndex = months.indexOf(month);
    const nextMonthIndex = (currentMonthIndex + 1) % 12;
    const nextYear = nextMonthIndex === 0 ? (parseInt(year) + 1).toString() : year;
    const nextMonth = months[nextMonthIndex];

    // Yeni yıl/ay formatı
    const newColumn = `${nextYear}/${nextMonth}`;

    setKolonlar([...kolonlar, newColumn]);
    setSporcular((prevSporcular) =>
      prevSporcular.map((sporcu) => ({
        ...sporcu,
        aidatlar: [...sporcu.aidatlar, ""] // Her sporcunun aidatlar dizisine yeni bir boş değer ekle
      }))
    );
  };

  // Yeni sporcu ekleme fonksiyonu
  const addSporcu = () => {
    const newSporcu: Sporcu = {
      id: (sporcular.length + 1).toString(),
      ad: "",
      dogumYili: "",
      aidatlar: new Array(kolonlar.length).fill(""),
    };
    setSporcular([...sporcular, newSporcu]);
  };

  // Kolon içeriği değiştirme fonksiyonu
  const handleAidatChange = (sporcuId: string, ayIndex: number, value: string) => {
    setSporcular((prevSporcular) =>
      prevSporcular.map((sporcu) =>
        sporcu.id === sporcuId
          ? {
              ...sporcu,
              aidatlar: sporcu.aidatlar.map((aidat, index) =>
                index === ayIndex ? value : aidat
              ),
            }
          : sporcu
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Aidatlar Sayfası</h2>

      {/* Kolon Ekle Butonu */}
      <button
        onClick={addColumn}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Kolon Ekle
      </button>

      {/* Yeni Sporcu Ekle Butonu */}
      <button
        onClick={addSporcu}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 ml-4"
      >
        Yeni Sporcu Ekle
      </button>

      {/* Tablolar */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Sporcu</th>
              <th className="border border-gray-300 p-2">Doğum Yılı</th>

              {/* Yeni Kolonlar */}
              {kolonlar.map((kolon, index) => (
                <th key={index} className="border border-gray-300 p-2">
                  {kolon}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sporcular.map((sporcu) => (
              <tr key={sporcu.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={sporcu.ad}
                    onChange={(e) => {
                      const newAd = e.target.value;
                      setSporcular((prevSporcular) =>
                        prevSporcular.map((s) =>
                          s.id === sporcu.id
                            ? {
                                ...s,
                                ad: newAd,
                              }
                            : s
                        )
                      );
                    }}
                    className="border border-gray-300 rounded p-1 w-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={sporcu.dogumYili}
                    onChange={(e) => {
                      const newDogumYili = e.target.value;
                      setSporcular((prevSporcular) =>
                        prevSporcular.map((s) =>
                          s.id === sporcu.id
                            ? {
                                ...s,
                                dogumYili: newDogumYili,
                              }
                            : s
                        )
                      );
                    }}
                    className="border border-gray-300 rounded p-1 w-full"
                  />
                </td>

                {/* Yeni Kolonlar için Değerler */}
                {kolonlar.map((kolon, index) => (
                  <td key={index} className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={sporcu.aidatlar[index] || ""}
                      onChange={(e) => handleAidatChange(sporcu.id, index, e.target.value)}
                      className="border border-gray-300 rounded p-1 w-full"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Aidatlar;
