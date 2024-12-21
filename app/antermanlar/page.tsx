"use client";

import { useState } from "react";
import YeniAntrenmanModal from "@/components/YeniAntrenmanModal";
import { useClub } from "@/app/contexts/ClubContext";

const AntremanlarPage = () => {
  const { selectedClub } = useClub();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    yil: "",
    brans: "",
    tip: "",
    grup: "",
  });

  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      yilBrans: "2024/Futbol",
      adi: "Isınma Antrenmanı",
      saat: "10:00 - 11:30",
      saha: "Saha A",
      antrenor: "Ali Veli",
      periyot: "Haftalık",
      malzemeler: "Top, Koniler",
      ucret: "200", // Yeni alan
      odemeTipi: "Aylık", // Yeni alan
      odemeTarihi: "2024-01-10", // Yeni alan
      kulup: "Kulüp A",
    },
    {
      id: 2,
      yilBrans: "2024/Basketbol",
      adi: "Dayanıklılık Antrenmanı",
      saat: "14:00 - 15:30",
      saha: "Saha B",
      antrenor: "Ayşe Yılmaz",
      periyot: "Aylık",
      malzemeler: "Basketbol Topu, Su Şişesi",
      ucret: "300",
      odemeTipi: "Tek Seferlik",
      odemeTarihi: "2024-01-15",
      kulup: "Kulüp B",
    },
  ]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredWorkouts = workouts.filter(
    (workout) =>
      workout.kulup === selectedClub &&
      (filters.yil === "" || workout.yilBrans.startsWith(filters.yil)) &&
      (filters.brans === "" || workout.yilBrans.includes(filters.brans))
  );

  return (
    <div className="flex h-screen">
      <div className="p-6 flex flex-col lg:flex-row">
        {/* Filtreleme Menüsü */}
        <aside className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Filtreleme</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Yıl</label>
              <select
                name="yil"
                value={filters.yil}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              >
                <option value="">Tümü</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Branş</label>
              <input
                type="text"
                name="brans"
                value={filters.brans}
                onChange={handleFilterChange}
                placeholder="Branş"
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
          </div>
        </aside>

        {/* Antrenman Listesi */}
        <section className="flex-1 bg-white p-4 rounded-lg shadow-md ml-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Antrenmanlar ({selectedClub})</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Yeni Antrenman Ekle
            </button>
            {isModalOpen && (
              <YeniAntrenmanModal
                onClose={() => setIsModalOpen(false)}
                onSave={(newWorkout) => {
                  setWorkouts((prev) => [
                    ...prev,
                    {
                      ...newWorkout,
                      kulup: selectedClub,
                      id: prev.length + 1, // ID oluşturma
                    },
                  ]);
                  setIsModalOpen(false);
                }}
              />
            )}
          </div>

          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Yıl/Branş</th>
                <th className="border px-4 py-2">Adı</th>
                <th className="border px-4 py-2">Saat</th>
                <th className="border px-4 py-2">Saha</th>
                <th className="border px-4 py-2">Antrenör</th>
                <th className="border px-4 py-2">Periyot</th>
                <th className="border px-4 py-2">Malzemeler</th>
                <th className="border px-4 py-2">Ücret</th> {/* Yeni Kolon */}
                <th className="border px-4 py-2">Ödeme Tipi</th> {/* Yeni Kolon */}
                <th className="border px-4 py-2">Ödeme Tarihi</th> {/* Yeni Kolon */}
              </tr>
            </thead>
            <tbody>
              {filteredWorkouts.length > 0 ? (
                filteredWorkouts.map((workout) => (
                  <tr key={workout.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{workout.yilBrans}</td>
                    <td className="border px-4 py-2">{workout.adi}</td>
                    <td className="border px-4 py-2">{workout.saat}</td>
                    <td className="border px-4 py-2">{workout.saha}</td>
                    <td className="border px-4 py-2">{workout.antrenor}</td>
                    <td className="border px-4 py-2">{workout.periyot}</td>
                    <td className="border px-4 py-2">{workout.malzemeler}</td>
                    <td className="border px-4 py-2">{workout.ucret} TL</td>
                    <td className="border px-4 py-2">{workout.odemeTipi}</td>
                    <td className="border px-4 py-2">{workout.odemeTarihi}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="border px-4 py-2 text-center text-gray-500"
                  >
                    Antrenman bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default AntremanlarPage;
