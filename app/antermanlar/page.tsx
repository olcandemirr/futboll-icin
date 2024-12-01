import { useState } from "react";
import YeniAntrenmanModal from "@/components/YeniAntrenmanModal";

interface AntrenmanData {
  brans: string;
  odeme: {
    aylik: boolean;
    tekSeferlik: boolean;
  };
  yil: string;
  ay: string;
  saat: string;
  ucret: string;
  odemeTarihi: string;
}

const AntremanlarPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    yil: "",
    brans: "",
    tip: "",
  });

  const [workouts, setWorkouts] = useState<AntrenmanData[]>([
    {
      brans: "Futbol",
      odeme: { aylik: true, tekSeferlik: false },
      yil: "2024",
      ay: "Ocak",
      saat: "10:00 - 11:30",
      ucret: "500",
      odemeTarihi: "2024-01-10",
    },
    {
      brans: "Basketbol",
      odeme: { aylik: false, tekSeferlik: true },
      yil: "2024",
      ay: "Şubat",
      saat: "14:00 - 15:30",
      ucret: "750",
      odemeTarihi: "2024-02-15",
    },
  ]);

  // Yeni antrenman ekleme
  const handleAddWorkout = (newWorkout: AntrenmanData) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
    setIsModalOpen(false);
  };

  // Filtreleme
  const filteredWorkouts = workouts.filter((workout) => {
    const matchesYil = filters.yil ? workout.yil === filters.yil : true;
    const matchesBrans = filters.brans
      ? workout.brans.toLowerCase().includes(filters.brans.toLowerCase())
      : true;
    const matchesTip = filters.tip
      ? workout.odeme.aylik && filters.tip === "Aylık"
        ? true
        : workout.odeme.tekSeferlik && filters.tip === "Tek Seferlik"
      : true;

    return matchesYil && matchesBrans && matchesTip;
  });

  // Filtrelerin güncellenmesi
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-screen">
      <div className="p-6 flex flex-col lg:flex-row">
        {/* Filtreleme Menüsü */}
        <aside className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Filtreler</h3>
          <label className="block mb-4">
            Yıl
            <input
              type="text"
              name="yil"
              className="w-full mt-1 p-2 border rounded"
              value={filters.yil}
              onChange={handleFilterChange}
            />
          </label>
          <label className="block mb-4">
            Branş
            <input
              type="text"
              name="brans"
              className="w-full mt-1 p-2 border rounded"
              value={filters.brans}
              onChange={handleFilterChange}
            />
          </label>
          <label className="block mb-4">
            Tip
            <select
              name="tip"
              className="w-full mt-1 p-2 border rounded"
              value={filters.tip}
              onChange={handleFilterChange}
            >
              <option value="">Hepsi</option>
              <option value="Aylık">Aylık</option>
              <option value="Tek Seferlik">Tek Seferlik</option>
            </select>
          </label>
        </aside>

        {/* Antrenman Listesi */}
        <section className="flex-1 bg-white p-4 rounded-lg shadow-md ml-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Antrenmanlar</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Yeni Antrenman Ekle
            </button>
          </div>

          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Branş</th>
                <th className="border px-4 py-2">Yıl</th>
                <th className="border px-4 py-2">Ay</th>
                <th className="border px-4 py-2">Saat</th>
                <th className="border px-4 py-2">Ücret</th>
                <th className="border px-4 py-2">Ödeme Tipi</th>
                <th className="border px-4 py-2">Ödeme Tarihi</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkouts.map((workout, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{workout.brans}</td>
                  <td className="border px-4 py-2">{workout.yil}</td>
                  <td className="border px-4 py-2">{workout.ay}</td>
                  <td className="border px-4 py-2">{workout.saat}</td>
                  <td className="border px-4 py-2">{workout.ucret} TL</td>
                  <td className="border px-4 py-2">
                    {workout.odeme.aylik
                      ? "Aylık"
                      : workout.odeme.tekSeferlik
                      ? "Tek Seferlik"
                      : "Belirtilmemiş"}
                  </td>
                  <td className="border px-4 py-2">{workout.odemeTarihi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {isModalOpen && (
        <YeniAntrenmanModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddWorkout}
        />
      )}
    </div>
  );
};

export default AntremanlarPage;
