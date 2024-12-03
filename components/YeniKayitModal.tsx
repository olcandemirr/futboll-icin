import { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface YeniKayitModalProps {
  onClose: () => void;
  onSave: (newAthlete: {
    id: number;
    name: string;
    gender: string;
    branch: string;
    contact: { relation: string; phone: string };
    guardians: { relation: string; phone: string }[];
  }) => void;
}

const YeniKayitModal: React.FC<YeniKayitModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    branch: "",
    contact: { relation: "Kendisi", phone: "" },
    guardians: [
      { relation: "Anne", phone: "" },
      { relation: "Baba", phone: "" },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("contact.")) {
      const contactField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [contactField]: value },
      }));
    } else if (name.startsWith("guardians.")) {
      const [_, index, field] = name.split(".");
      setFormData((prev) => {
        const updatedGuardians = [...prev.guardians];
        // `as keyof { relation: string; phone: string }` ile dizin türünü belirtin
        updatedGuardians[parseInt(index)][field as keyof { relation: string; phone: string }] = value;
        return { ...prev, guardians: updatedGuardians };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.gender ||
      !formData.branch ||
      !formData.contact.phone ||
      formData.guardians.some((guardian) => !guardian.phone)
    ) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    const newAthlete = {
      id: Date.now(),
      ...formData,
    };
    onSave(newAthlete);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Yeni Sporcu Kaydı</h2>
          <button onClick={onClose} className="text-red-500">
            <FaTimes className="text-2xl" />
          </button>
        </div>
        <form className="grid grid-cols-2 gap-4">
          {/* Genel Bilgiler */}
          <div>
            <h3 className="text-lg font-bold mb-2">Genel Bilgiler</h3>
            <div className="mb-3">
              <label className="block text-gray-700">Branş</label>
              <select
                name="branch"
                className="border p-2 w-full"
                value={formData.branch}
                onChange={handleChange}
              >
                <option value="">Seçiniz</option>
                <option value="Futbol">Futbol</option>
                <option value="Basketbol">Basketbol</option>
                <option value="Voleybol">Voleybol</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Adı</label>
              <input
                type="text"
                name="name"
                className="border p-2 w-full"
                placeholder="Adı"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Cinsiyet</label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Bay"
                    className="mr-2"
                    onChange={handleChange}
                  />{" "}
                  Bay
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Bayan"
                    className="mr-2"
                    onChange={handleChange}
                  />{" "}
                  Bayan
                </label>
              </div>
            </div>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h3 className="text-lg font-bold mb-2">İletişim Bilgileri</h3>
            <div className="mb-3">
              <label className="block text-gray-700">Yakınlık</label>
              <select
                name="contact.relation"
                className="border p-2 w-full"
                value={formData.contact.relation}
                onChange={handleChange}
              >
                <option value="Kendisi">Kendisi</option>
                <option value="Aile">Aile</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Telefon</label>
              <input
                type="text"
                name="contact.phone"
                className="border p-2 w-full"
                placeholder="Telefon"
                value={formData.contact.phone}
                onChange={handleChange}
              />
            </div>

            {/* Veli 1 */}
            <h3 className="text-lg font-bold mt-4">Veli 1 Bilgisi</h3>
            <div className="mb-3">
              <label className="block text-gray-700">Yakınlık</label>
              <input
                type="text"
                name="guardians.0.relation"
                className="border p-2 w-full"
                placeholder="Örn: Anne"
                value={formData.guardians[0].relation}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Telefon</label>
              <input
                type="text"
                name="guardians.0.phone"
                className="border p-2 w-full"
                placeholder="Telefon"
                value={formData.guardians[0].phone}
                onChange={handleChange}
              />
            </div>

            {/* Veli 2 */}
            <h3 className="text-lg font-bold mt-4">Veli 2 Bilgisi</h3>
            <div className="mb-3">
              <label className="block text-gray-700">Yakınlık</label>
              <input
                type="text"
                name="guardians.1.relation"
                className="border p-2 w-full"
                placeholder="Örn: Baba"
                value={formData.guardians[1].relation}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Telefon</label>
              <input
                type="text"
                name="guardians.1.phone"
                className="border p-2 w-full"
                placeholder="Telefon"
                value={formData.guardians[1].phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>

        {/* Kaydet Butonu */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default YeniKayitModal;
