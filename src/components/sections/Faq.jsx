// src/components/sections/Faq.jsx

import React, { useState } from "react";
// Sesuaikan jalur impor ini agar sesuai dengan lokasi FaqItem.jsx Anda (Asumsi: Naik dua tingkat)
import FaqItem from "../ui/FaqItem.jsx";

// Data FAQ statis, disimpan langsung di memori (bukan Local Storage)
const faqData = [
  {
    id: 1,
    question:
      "Apakah saya harus login untuk bisa menggunakan web Mood Tracking ini?",
    answer:
      "Tentu saja **Tidak**. Aplikasi ini dirancang untuk kemudahan dan kecepatan. Anda bisa langsung mulai mencatat suasana hati Anda tanpa perlu proses registrasi atau *login*. Data Anda akan langsung disimpan di browser Anda.",
  },
  {
    id: 2,
    question: "Di mana data suasana hati saya disimpan?",
    answer:
      "Data suasana hati Anda disimpan langsung di **Local Storage** browser web yang Anda gunakan. Artinya, data Anda **tersimpan aman secara lokal** di perangkat Anda sendiri dan tidak dikirim ke server eksternal.",
  },
  {
    id: 3,
    question: "Apa kelebihan dan kekurangan menggunakan Local Storage?",
    answer:
      "**Kelebihan:** Cepat, *offline-friendly*, dan tidak butuh *server*. **Kekurangan:** Data tidak bisa disinkronkan antar perangkat (hanya ada di satu browser) dan bisa hilang jika Anda menghapus data browser.",
  },
  {
    id: 4,
    question: "Bagaimana cara kerja fitur Mood Tracking ini?",
    answer:
      "Anda cukup memilih kategori suasana hati Anda saat ini dan menambahkan catatan singkat. Aplikasi akan menyimpan *log* ini di Local Storage, dan Anda bisa melihat riwayat atau statistik suasana hati Anda kapan saja selama menggunakan browser yang sama.",
  },
];

function markdownToHtml(text) {
  // 1. Mengubah **Teks** menjadi <strong>Teks</strong> (Bold)
  let htmlText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // 2. Mengubah *Teks* menjadi <em>Teks</em> (Italic)
  htmlText = htmlText.replace(/\*(.*?)\*/g, "<em>$1</em>");
  return htmlText;
}

// ⬅️ PRAPROSES DATA DI SINI
const formattedFaqData = faqData.map((faq) => ({
  ...faq,
  answerHtml: markdownToHtml(faq.answer), // Membuat properti baru yang sudah HTML
}));

export default function Faq() {
  // Hanya menggunakan satu state untuk melacak item mana yang terbuka
  const [openItemId, setOpenItemId] = useState(null);

  // Fungsi untuk menangani toggle (buka/tutup)
  const handleToggle = (id) => {
    // Jika item yang diklik sudah terbuka (prevId === id), tutup (null), jika tidak, buka (id)
    setOpenItemId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-10 border border-[#1D493C]">
        <h1 className="text-4xl font-extrabold text-center text-[#1D493C]">
          Pusat Bantuan
        </h1>
        <p className="text-center text-gray-500 mb-10 text-lg">
          Semua yang perlu Anda tahu tentang cara kerja website ini.
        </p>

        {/* Daftar FAQ - Menggunakan data statis */}
        <div className="faq-list border border-gray-200 rounded-lg overflow-hidden">
          {formattedFaqData.map((faq) => (
            <FaqItem
              key={faq.id}
              question={faq.question}
              answer={faq.answerHtml} // Gunakan properti baru yang sudah diformat
              // Tentukan apakah item ini terbuka atau tidak
              isOpen={openItemId === faq.id}
              onClick={() => handleToggle(faq.id)}
            />
          ))}
        </div>

        <p className="mt-8 text-sm text-center text-gray-400 italic">
          **Catatan Penting:** Data FAQ ini dimuat secara statis dan tidak
          menggunakan Local Storage.
        </p>
      </div>
    </div>
  );
}
