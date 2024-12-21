import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const YeniAntrenmanModal = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (data: any) => void;
}) => {
  const [antrenmanYilBrans, setAntrenmanYilBrans] = useState("2024/Futbol");
  const [antrenmanAdi, setAntrenmanAdi] = useState("");
  const [antrenmanSaati, setAntrenmanSaati] = useState("17:00");
  const [bitisSaati, setBitisSaati] = useState("18:00");
  const [antrenmanSaha, setAntrenmanSaha] = useState("");
  const [antrenmanAntrenor, setAntrenmanAntrenor] = useState("");
  const [antrenmanPeriyot, setAntrenmanPeriyot] = useState("Haftalık");
  const [malzemeler, setMalzemeler] = useState("");
  const [ucret, setUcret] = useState("");
  const [odemeTipi, setOdemeTipi] = useState("Aylık");
  const [odemeTarihi, setOdemeTarihi] = useState("");

  // Form gönderme işlemi
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!antrenmanAdi || !antrenmanSaha || !antrenmanAntrenor || !ucret) {
      alert("Lütfen tüm gerekli alanları doldurun!");
      return;
    }

    // Form verilerini kaydetme
    const antrenmanData = {
      yilBrans: antrenmanYilBrans,
      adi: antrenmanAdi,
      saat: `${antrenmanSaati} - ${bitisSaati}`,
      saha: antrenmanSaha,
      antrenor: antrenmanAntrenor,
      periyot: antrenmanPeriyot,
      malzemeler,
      ucret,
      odemeTipi,
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
          {/* Yıl/Branş */}
          <div>
            <label htmlFor="antrenmanYilBrans" className="block text-gray-700 mb-2">
              Yıl/Branş
            </label>
            <select
              id="antrenmanYilBrans"
              className="border w-full p-2 rounded"
              value={antrenmanYilBrans}
              onChange={(e) => setAntrenmanYilBrans(e.target.value)}
            >
              <option value="2024/Futbol">2024/Futbol</option>
              <option value="2024/Basketbol">2024/Basketbol</option>
              <option value="2024/Voleybol">2024/Voleybol</option>
            </select>
          </div>

          {/* Adı */}
          <div>
            <label htmlFor="antrenmanAdi" className="block text-gray-700 mb-2">
              Antrenman Adı
            </label>
            <input
              id="antrenmanAdi"
              type="text"
              className="border w-full p-2 rounded"
              placeholder="Antrenman Adını Giriniz"
              value={antrenmanAdi}
              onChange={(e) => setAntrenmanAdi(e.target.value)}
            />
          </div>

          {/* Saat */}
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

          {/* Saha */}
          <div>
            <label htmlFor="antrenmanSaha" className="block text-gray-700 mb-2">
              Saha
            </label>
            <input
              id="antrenmanSaha"
              type="text"
              className="border w-full p-2 rounded"
              placeholder="Saha Adını Giriniz"
              value={antrenmanSaha}
              onChange={(e) => setAntrenmanSaha(e.target.value)}
            />
          </div>

          {/* Antrenör */}
          <div>
            <label htmlFor="antrenmanAntrenor" className="block text-gray-700 mb-2">
              Antrenör
            </label>
            <input
              id="antrenmanAntrenor"
              type="text"
              className="border w-full p-2 rounded"
              placeholder="Antrenör İsmini Giriniz"
              value={antrenmanAntrenor}
              onChange={(e) => setAntrenmanAntrenor(e.target.value)}
            />
          </div>

          {/* Periyot */}
          <div>
            <label htmlFor="antrenmanPeriyot" className="block text-gray-700 mb-2">
              Periyot
            </label>
            <select
              id="antrenmanPeriyot"
              className="border w-full p-2 rounded"
              value={antrenmanPeriyot}
              onChange={(e) => setAntrenmanPeriyot(e.target.value)}
            >
              <option value="Haftalık">Haftalık</option>
              <option value="Aylık">Aylık</option>
              <option value="Tek Seferlik">Tek Seferlik</option>
            </select>
          </div>

          {/* Malzemeler */}
          <div className="col-span-2">
            <label htmlFor="malzemeler" className="block text-gray-700 mb-2">
              Malzemeler
            </label>
            <input
              id="malzemeler"
              type="text"
              className="border w-full p-2 rounded"
              placeholder="Ör: Top, Koniler"
              value={malzemeler}
              onChange={(e) => setMalzemeler(e.target.value)}
            />
          </div>

          {/* Ücret */}
          <div>
            <label htmlFor="ucret" className="block text-gray-700 mb-2">
              Ücret (TL)
            </label>
            <input
              id="ucret"
              type="number"
              className="border w-full p-2 rounded"
              placeholder="Ücret Giriniz"
              value={ucret}
              onChange={(e) => setUcret(e.target.value)}
            />
          </div>

          {/* Ödeme Tipi */}
          <div>
            <label htmlFor="odemeTipi" className="block text-gray-700 mb-2">
              Ödeme Tipi
            </label>
            <select
              id="odemeTipi"
              className="border w-full p-2 rounded"
              value={odemeTipi}
              onChange={(e) => setOdemeTipi(e.target.value)}
            >
              <option value="Aylık">Aylık</option>
              <option value="Tek Seferlik">Tek Seferlik</option>
            </select>
          </div>

          {/* Ödeme Tarihi */}
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

          {/* Kaydet Butonu */}
          <div className="mt-4 flex justify-end col-span-2">
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
