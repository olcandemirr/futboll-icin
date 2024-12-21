"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const GirisKayitEkrani = () => {
  const [isKayit, setIsKayit] = useState(false);
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Şimdilik basit bir yönlendirme
    if (kullaniciAdi && sifre) {
      router.push("/sporcular");
    } else {
      alert("Lütfen tüm alanları doldurun.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">
          {isKayit ? "Kayıt Ol" : "Giriş Yap"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Kullanıcı Adı</label>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-full"
            value={kullaniciAdi}
            onChange={(e) => setKullaniciAdi(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Şifre</label>
          <input
            type="password"
            className="border border-gray-300 rounded p-2 w-full"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          {isKayit ? "Kayıt Ol" : "Giriş Yap"}
        </button>
        <p
          onClick={() => setIsKayit(!isKayit)}
          className="text-center text-blue-500 mt-4 cursor-pointer"
        >
          {isKayit
            ? "Zaten bir hesabınız var mı? Giriş Yap"
            : "Hesabınız yok mu? Kayıt Ol"}
        </p>
      </form>
    </div>
  );
};

export default GirisKayitEkrani;
