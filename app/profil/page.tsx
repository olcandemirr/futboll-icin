"use client";
import React from "react";
import Image from 'next/image';
const ProfilPage = () => {
  const profil = {
    fotoğraf: "/images/profil.jpg", // Profil fotoğrafı
    ad: " ",
    soyad: "",
    çalıştığıYerler: ["takımA", "Takım B", "Takım C"], // Çalıştığı yerler
    hakkında: "Sporcu antrenmanları ve yönetimi konusunda deneyime sahip, takım çalışmasına önem veren bir lider." // Kısa bilgi
  };

  return (
    <div className="flex h-full justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-center mb-6">
          <Image
            src={profil.fotoğraf}
            alt="Behçet Tarım"
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            {profil.ad} {profil.soyad}
          </h1>
          {/* Kendi Hakkında Kısmı */}
          <h3 className="text-lg font-semibold text-gray-700 mt-6">Kendi Hakkında:</h3>
          <p className="text-gray-600 mt-2">{profil.hakkında}</p>
        
          <h3 className="text-lg text-gray-700 mb-4">Çalıştığı Yerler:</h3>
          <ul className="space-y-2 text-gray-600">
            {profil.çalıştığıYerler.map((yer, index) => (
              <li key={index} className="text-sm">{yer}</li>
            ))}
          </ul>

          </div>
      </div>
    </div>
  );
};

export default ProfilPage;
