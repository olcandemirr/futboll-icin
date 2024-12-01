import { useState } from "react";
import { FaTimes } from "react-icons/fa";

// Veri yapısı için arayüz tanımı
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!antrenmanUcreti || parseInt(antrenmanUcreti) < 0) {
      alert("Lütfen geçerli bir ücret giriniz!");
      return;
    }

    // Form verilerini oluştur
    const antrenmanData: AntrenmanData = {
      brans: selectedBrans,
      odeme: toggleOdeme,
      yil: antrenmanYili,
      ay: baslangicAyi,
      saat: `${antrenmanSaati} - ${bitisSaati}`,
      ucret: antrenmanUcreti,
      odemeTarihi,
    };

    onSave(antrenmanData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
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
          <div>
            <label htmlFor="antrenmanBrans" className="block text-gray-700 mb-2">
              Antrenman Branşı
            </label>
            <select
              id="antrenmanBrans"
              className="border w-full p-2 rounded"
              value={selectedBrans}
              onChange={(e) => setSelectedBrans(e.target.value)}
            >
              <option value="Futbol">Futbol</option>
              <option value="Basketbol">Basketbol</option>
              <option value="Voleybol">Voleybol</option>
            </select>
          </div>

          <div>
            <label htmlFor="antrenmanYili" className="block text-gray-700 mb-2">
              Antrenman Yılı
            </label>
            <select
              id="antrenmanYili"
              className="border w-full p-2 rounded"
              value={antrenmanYili}
              onChange={(e) => setAntrenmanYili(e.target.value)}
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>

          <div>
            <label htmlFor="baslangicAyi" className="block text-gray-700 mb-2">
              Başlangıç Ayı
            </label>
            <select
              id="baslangicAyi"
              className="border w-full p-2 rounded"
              value={baslangicAyi}
              onChange={(e) => setBaslangicAyi(e.target.value)}
            >
              <option value="Ocak">Ocak</option>
              <option value="Şubat">Şubat</option>
              <option value="Mart">Mart</option>
              <option value="Kasım">Kasım</option>
            </select>
          </div>

          <div>
            <label htmlFor="antrenmanSaati" className="block text-gray-700 mb-2">
              Antrenman Saati
            </label>
            <div className="flex gap-2">
              <input
                type="time"
                id="antrenmanSaati"
                className="border w-full p-2 rounded"
                value={antrenmanSaati}
                onChange={(e) => setAntrenmanSaati(e.target.value)}
              />
              <input
                type="time"
                id="bitisSaati"
                className="border w-full p-2 rounded"
                value={bitisSaati}
                onChange={(e) => setBitisSaati(e.target.value)}
              />
            </div>
          </div>

          <div className="col-span-2 flex flex-col p-4 border rounded">
            <span className="text-gray-700 font-medium mb-2">Antrenman Tipi</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={toggleOdeme.aylik}
                  onChange={() =>
                    setToggleOdeme((prev) => ({ ...prev, aylik: !prev.aylik }))
                  }
                />
                <span className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500"></span>
                <span className="ml-2">Aylık Ödeme</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={toggleOdeme.tekSeferlik}
                  onChange={() =>
                    setToggleOdeme((prev) => ({ ...prev, tekSeferlik: !prev.tekSeferlik }))
                  }
                />
                <span className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500"></span>
                <span className="ml-2">Tek Seferlik</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="antrenmanUcreti" className="block text-gray-700 mb-2">
              Antrenman Ücreti - TL
            </label>
            <input
              id="antrenmanUcreti"
              type="number"
              className="border w-full p-2 rounded"
              placeholder="Ücretsiz antrenmanlar için 0 yazınız"
              value={antrenmanUcreti}
              onChange={(e) => setAntrenmanUcreti(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="odemeTarihi" className="block text-gray-700 mb-2">
              Ödeme Tarihi
            </label>
            <input
              id="odemeTarihi"
              type="date"
              className="border w-full p-2 rounded"
              value={odemeTarihi}
              onChange={(e) => setOdemeTarihi(e.target.value)}
            />
          </div>

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
