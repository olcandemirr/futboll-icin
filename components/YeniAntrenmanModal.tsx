import { useState } from "react";
import { FaTimes } from "react-icons/fa";

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
  malzeme: string; // Verilen Malzeme
}

const YeniAntrenmanModal = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (data: AntrenmanData) => void;
}) => {
  const [selectedBrans, setSelectedBrans] = useState("Futbol");
  const [toggleOdeme, setToggleOdeme] = useState({ aylik: false, tekSeferlik: false });
  const [antrenmanYili, setAntrenmanYili] = useState("2024");
  const [baslangicAyi, setBaslangicAyi] = useState("Ocak");
  const [antrenmanSaati, setAntrenmanSaati] = useState("17:00");
  const [bitisSaati, setBitisSaati] = useState("18:00");
  const [antrenmanUcreti, setAntrenmanUcreti] = useState("");
  const [odemeTarihi, setOdemeTarihi] = useState("");
  const [malzeme, setMalzeme] = useState(""); // Yeni malzeme

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!antrenmanUcreti || parseInt(antrenmanUcreti) < 0) {
      alert("Lütfen geçerli bir ücret giriniz!");
      return;
    }

    const antrenmanData: AntrenmanData = {
      brans: selectedBrans,
      odeme: toggleOdeme,
      yil: antrenmanYili,
      ay: baslangicAyi,
      saat: `${antrenmanSaati} - ${bitisSaati}`,
      ucret: antrenmanUcreti,
      odemeTarihi,
      malzeme,
    };

    onSave(antrenmanData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Yeni Antrenman Ekle</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500">
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">
          {/* Diğer form alanları */}
          <div>
            <label htmlFor="malzeme" className="block text-gray-700 mb-2">
              Verilen Malzeme
            </label>
            <input
              id="malzeme"
              type="text"
              className="border w-full p-2 rounded"
              placeholder="Örn: Top, Forma"
              value={malzeme}
              onChange={(e) => setMalzeme(e.target.value)}
            />
          </div>
          {/* Form Submit */}
          <div className="mt-4 flex justify-end">
            <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default YeniAntrenmanModal;
