"use client";
import React, { useState } from "react";

const GeneralSettings = () => {
  const [activeSetting, setActiveSetting] = useState("kurum-bilgileri");

  const renderSettingContent = () => {
    switch (activeSetting) {
      case "kurum-bilgileri":
        return (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Kurum Bilgileri</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1">Kurum Adı</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  defaultValue="İNCİLİPINARGÜCÜ"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Kurum Adresi</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  defaultValue="İNCİLİPINAR-DENİZLİ"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Yetkili Adı</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  defaultValue="BEHÇET ARIM"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Telefon</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  defaultValue="5362181599"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="border border-gray-300 rounded p-2 w-full"
                  defaultValue="behcet_arim@hotmail.com"
                />
              </div>
            </div>
            <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
              Bilgileri Güncelle
            </button>

            {/* Şubeler ve Branşlar */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Şubeler</h3>
                <table className="w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 p-2">Sıra</th>
                      <th className="border border-gray-300 p-2">Şube Adı</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">1</td>
                      <td className="border border-gray-300 p-2">Merkez</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Branşlar</h3>
                <table className="w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 p-2">Sıra</th>
                      <th className="border border-gray-300 p-2">Branş Adı</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">1</td>
                      <td className="border border-gray-300 p-2">Futbol</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Ayar Seçimi Yapın</div>;
    }
  };

  return (
    <div className="flex">
      {/* Sol Menü */}
      <div className="w-64 bg-white shadow-lg rounded-lg p-4">
        <h3 className="text-lg font-bold mb-4">Genel Ayarlar</h3>
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeSetting === "kurum-bilgileri"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-400"
              }`}
              onClick={() => setActiveSetting("kurum-bilgileri")}
            >
              Kurum Bilgileri
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeSetting === "grup-ayarlari"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-400"
              }`}
              onClick={() => setActiveSetting("grup-ayarlari")}
            >
              Grup Ayarları
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeSetting === "saha-ayarlari"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-400"
              }`}
              onClick={() => setActiveSetting("saha-ayarlari")}
            >
              Saha Ayarları
            </button>
          </li>
        </ul>
      </div>

      {/* İçerik */}
      <div className="flex-1 p-4">{renderSettingContent()}</div>
    </div>
  );
};

export default GeneralSettings;
