import React, { useState, useCallback } from "react";
import { FaTimes } from "react-icons/fa";

interface YeniKayitModalProps {
  onClose: () => void;
  onSave: (newAthlete: {
    id: number;
    name: string;
    gender: string;
    branch: string;
    phone: string;
    durum: string;
    contact: { relation: string; phone: string; role: string }[];
  }) => void;
}

const YeniKayitModal: React.FC<YeniKayitModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    branch: "",
    phone: "",
    durum: "\u00d6n K\u0131yay", // Varsay\u0131lan durum
    contact: [
      { relation: "Veli 1", phone: "", role: "Anne" },
      { relation: "Veli 2", phone: "", role: "Baba" },
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name.startsWith("contact.")) {
        const [_, index, field] = name.split(".");
        setFormData((prev) => {
          const updatedContacts = [...prev.contact];
          updatedContacts[+index] = {
            ...updatedContacts[+index],
            [field]: value,
          };
          return { ...prev, contact: updatedContacts };
        });
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  const validateForm = () => {
    const { name, gender, branch, phone, contact } = formData;
    if (!name || !gender || !branch || !phone || contact.some((c) => !c.phone)) {
      alert("L\u00fctfen t\u00fcm alanlar\u0131 doldurun!");
      return false;
    }
    const phoneRegex = /^[0-9]{10}$/; // 10 haneli telefon numaras\u0131
    if (!phoneRegex.test(phone) || contact.some((c) => !phoneRegex.test(c.phone))) {
      alert("Telefon numaralar\u0131 10 haneli olmal\u0131d\u0131r!");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true); // Kaydetme i\u015flemi ba\u015flad\u0131
    const newAthlete = {
      id: Date.now(), // Benzersiz id
      ...formData,
    };
    onSave(newAthlete);
    setIsSubmitting(false); // Kaydetme i\u015flemi tamamland\u0131
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg">
        {/* Ba\u015fl\u0131k */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Yeni Sporcu Kayd\u0131</h2>
          <button onClick={onClose} className="text-red-500">
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form className="grid grid-cols-2 gap-4">
          {/* Genel Bilgiler */}
          <div>
            <h3 className="text-lg font-bold mb-2">Genel Bilgiler</h3>
            <div className="mb-3">
              <label className="block text-gray-700">Bran\u015f</label>
              <select
                name="branch"
                className="border p-2 w-full"
                value={formData.branch}
                onChange={handleChange}
                aria-label="Bran\u015f se\u00e7imi"
              >
                <option value="">Se\u00e7iniz</option>
                <option value="Futbol">Futbol</option>
                <option value="Basketbol">Basketbol</option>
                <option value="Voleybol">Voleybol</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Ad\u0131</label>
              <input
                type="text"
                name="name"
                className="border p-2 w-full"
                placeholder="Ad\u0131"
                value={formData.name}
                onChange={handleChange}
                aria-label="Ad\u0131"
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
                    aria-label="Bay"
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
                    aria-label="Bayan"
                  />{" "}
                  Bayan
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Durum</label>
              <select
                name="durum"
                className="border p-2 w-full"
                value={formData.durum}
                onChange={handleChange}
                aria-label="Durum se\u00e7imi"
              >
                <option value="\u00d6n K\u0131yay">\u00d6n K\u0131yay</option>
                <option value="Aktif">Aktif</option>
                <option value="Pasif">Pasif</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Sporcunun Telefonu</label>
              <input
                type="text"
                name="phone"
                className="border p-2 w-full"
                placeholder="Telefon"
                value={formData.phone}
                onChange={handleChange}
                aria-label="Sporcunun Telefonu"
              />
            </div>
          </div>

          {/* Veli Bilgileri */}
          <div>
            <h3 className="text-lg font-bold mb-2">Veli Bilgileri</h3>
            {formData.contact.map((contact, index) => (
              <div key={index} className="mb-3">
                <label className="block text-gray-700">
                  {contact.relation} Telefon
                </label>
                <input
                  type="text"
                  name={`contact.${index}.phone`}
                  className="border p-2 w-full"
                  placeholder="Telefon"
                  value={contact.phone}
                  onChange={handleChange}
                  aria-label={`${contact.relation} Telefon`}
                />
                <label className="block text-gray-700 mt-2">Kim?</label>
                <select
                  name={`contact.${index}.role`}
                  className="border p-2 w-full"
                  value={contact.role}
                  onChange={handleChange}
                  aria-label={`${contact.relation} Kim?`}
                >
                  <option value="Anne">Anne</option>
                  <option value="Baba">Baba</option>
                </select>
              </div>
            ))}
          </div>
        </form>

        {/* Kaydet Butonu */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded ${
              isSubmitting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default YeniKayitModal;