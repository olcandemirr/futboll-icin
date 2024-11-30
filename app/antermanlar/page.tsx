"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";
import YeniAntrenmanModal from "@/components/YeniAntrenmanModal";

const AntremanlarPage = () => {
  
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
    },
    {
      id: 2,
      yilBrans: "2024/Basketbol",
      adi: "Dayanıklılık Antrenmanı",
      saat: "14:00 - 15:30",
      saha: "Saha B",
      antrenor: "Ayşe Yılmaz",
      periyot: "Aylık",
    },
  ]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen">
      

        <div className="p-6 flex flex-col lg:flex-row">
          {/* Filtreleme Menüsü */}
          <aside className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Filtreleme</h2>
            <div className="space-y-4">
              {/* Yıl */}
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

              {/* Branş */}
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

              {/* Tip */}
              <div>
                <label className="block text-gray-700 font-medium">Tipi</label>
                <div className="space-y-2">
                  <label className="block">
                    <input type="radio" name="tip" value="Aylık" onChange={handleFilterChange} /> Aylık Ödeme
                  </label>
                  <label className="block">
                    <input type="radio" name="tip" value="Tek Seferlik" onChange={handleFilterChange} /> Tek Seferlik
                  </label>
                </div>
              </div>

              {/* Grup */}
              <div>
                <label className="block text-gray-700 font-medium">Grup</label>
                <div className="space-y-2">
                  <label className="block">
                    <input type="checkbox" name="grup" value="Gelişim Grubu" onChange={handleFilterChange} /> Gelişim Grubu
                  </label>
                  <label className="block">
                    <input type="checkbox" name="grup" value="Lisanslı" onChange={handleFilterChange} /> Lisanslı
                  </label>
                  <label className="block">
                    <input type="checkbox" name="grup" value="Erkekler" onChange={handleFilterChange} /> Erkekler
                  </label>
                  <label className="block">
                    <input type="checkbox" name="grup" value="Kadınlar" onChange={handleFilterChange} /> Kadınlar
                  </label>
                  <label className="block">
                    <input type="checkbox" name="grup" value="Kaleciler" onChange={handleFilterChange} /> Kaleciler
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Antrenman Listesi */}
          <section className="flex-1 bg-white p-4 rounded-lg shadow-md ml-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Antrenmanlar</h2>
              {/*<button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Yeni Antrenman Ekle
              </button>*/}
              <button onClick={() => setIsModalOpen(true)}>Yeni Antrenman Ekle</button>
              {isModalOpen && <YeniAntrenmanModal onClose={() => setIsModalOpen(false)} />}
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
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout.id}>
                    <td className="border px-4 py-2">{workout.yilBrans}</td>
                    <td className="border px-4 py-2">{workout.adi}</td>
                    <td className="border px-4 py-2">{workout.saat}</td>
                    <td className="border px-4 py-2">{workout.saha}</td>
                    <td className="border px-4 py-2">{workout.antrenor}</td>
                    <td className="border px-4 py-2">{workout.periyot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
   
  );
};

export default AntremanlarPage;
