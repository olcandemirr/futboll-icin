"use client";

import React, { useState } from "react";
import { useClub } from "@/app/contexts/ClubContext";

// Sporcu tipi
type Sporcu = {
  id: string;
  ad: string;
  dogumYili: string;
  aidatlar: string[];
  kulup: string;
  [key: string]: string | string[];
};

const Aidatlar = () => {
  const { selectedClub } = useClub();

  const [sporcular, setSporcular] = useState<Sporcu[]>([
    {
      id: "1",
      ad: "Ahmet Yılmaz",
      dogumYili: "1995",
      aidatlar: [],
      kulup: "Kulüp A",
    },
    {
      id: "2",
      ad: "Mehmet Demir",
      dogumYili: "1990",
      aidatlar: [],
      kulup: "Kulüp B",
    },
  ]);

  const [kolonlar, setKolonlar] = useState<string[]>([]);

  const addColumn = () => {
    const lastMonth = kolonlar.length ? kolonlar[kolonlar.length - 1] : "2024/Ocak";
    const [year, month] = lastMonth.split("/");
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];

    const currentMonthIndex = months.indexOf(month);
    const nextMonthIndex = (currentMonthIndex + 1) % 12;
    const nextYear = nextMonthIndex === 0 ? (parseInt(year) + 1).toString() : year;
    const nextMonth = months[nextMonthIndex];

    const newColumn = `${nextYear}/${nextMonth}`;

    setKolonlar([...kolonlar, newColumn]);
    setSporcular((prevSporcular) =>
      prevSporcular.map((sporcu) => ({
        ...sporcu,
        aidatlar: [...sporcu.aidatlar, ""]
      }))
    );
  };

  const addSporcu = () => {
    const newSporcu: Sporcu = {
      id: (sporcular.length + 1).toString(),
      ad: "",
      dogumYili: "",
      aidatlar: new Array(kolonlar.length).fill(""),
      kulup: selectedClub,
    };
    setSporcular([...sporcular, newSporcu]);
  };

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

  const filteredSporcular = sporcular.filter(
    (sporcu) => sporcu.kulup === selectedClub
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Aidatlar ({selectedClub})</h2>

      <button
        onClick={addColumn}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Kolon Ekle
      </button>

      <button
        onClick={addSporcu}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 ml-4"
      >
        Yeni Sporcu Ekle
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Sporcu</th>
              <th className="border border-gray-300 p-2">Doğum Yılı</th>
              {kolonlar.map((kolon, index) => (
                <th key={index} className="border border-gray-300 p-2">
                  {kolon}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredSporcular.map((sporcu) => (
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
