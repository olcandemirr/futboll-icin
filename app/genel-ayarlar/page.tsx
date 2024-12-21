"use client";

import React, { useState } from "react";
import { useClub } from "@/app/contexts/ClubContext";

const GeneralSettings = () => {
  const { selectedClub } = useClub();
  const [activeSetting, setActiveSetting] = useState("kurum-bilgileri");

  const renderSettingContent = () => {
    switch (activeSetting) {
      case "kurum-bilgileri":
        return (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Kurum Bilgileri ({selectedClub})</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1">Kurum Adı</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  defaultValue={selectedClub === "Kulüp A" ? "İNCİLİPINARGÜCÜ" : ""}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Kurum Adresi</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  defaultValue={selectedClub === "Kulüp A" ? "İNCİLİPINAR-DENİZLİ" : ""}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Yetkili Adı</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  defaultValue={selectedClub === "Kulüp A" ? "BEHÇET ARIM" : ""}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Telefon</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  defaultValue={selectedClub === "Kulüp A" ? "5362181599" : ""}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="border border-gray-300 rounded p-2 w-full"
                  defaultValue={selectedClub === "Kulüp A" ? "behcet_arim@hotmail.com" : ""}
                />
              </div>
            </div>
            <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
              Bilgileri Güncelle
            </button>
          </div>
        );
      case "grup-ayarlari":
        return (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Grup Ayarları ({selectedClub})</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1">Grup Adı</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  placeholder="Yeni Grup"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Grup Tipi</label>
                <select className="border border-gray-300 rounded p-2 w-full">
                  <option value="yetişkin">Yetişkin</option>
                  <option value="çocuk">Çocuk</option>
                  <option value="genç">Genç</option>
                </select>
              </div>
            </div>
            <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
              Grup Ekle
            </button>
          </div>
        );
      case "saha-ayarlari":
        return (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Saha Ayarları ({selectedClub})</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1">Saha Adı</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  placeholder="Yeni Saha"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Konum</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  placeholder="Konum"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Saha Boyutu</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full"
                  placeholder="Ölçüler"
                />
              </div>
            </div>
            <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
              Saha Ekle
            </button>
          </div>
        );
      default:
        return <div>Ayar Seçimi Yapın</div>;
    }
  };

  return (
    <div className="flex">
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

      <div className="flex-1 p-4">{renderSettingContent()}</div>
    </div>
  );
};

export default GeneralSettings;
