// src/components/sections/Faq.jsx

import React, { useState } from "react";
// Sesuaikan jalur impor ini agar sesuai dengan lokasi FaqItem.jsx Anda (Asumsi: Naik dua tingkat)
import FaqItem from "../ui/FaqItem.jsx";

// Data FAQ statis, disimpan langsung di memori (bukan Local Storage)
const faqData = [
  {
    id: 1,
    question: "Do I have to log in to use this Mood Tracking web application?",
    answer:
      "Of course, **No**. This application is designed for ease and speed. You can start recording your mood immediately without needing a registration or *login* process. Your data will be saved directly in your browser.",
  },
  {
    id: 2,
    question: "Where is my mood data stored?",
    answer:
      "Your mood data is stored directly in the **Local Storage** of the web browser you are using. This means your data is **securely stored locally** on your own device and is not sent to an external server.",
  },
  {
    id: 3,
    question:
      "What are the advantages and disadvantages of using Local Storage?",
    answer:
      "**Advantages:** Fast, *offline-friendly*, and requires no *server*. **Disadvantages:** Data cannot be synchronized across devices (it only exists in one browser) and can be lost if you clear your browser data.",
  },
  {
    id: 4,
    question: "How does this Mood Tracking feature work?",
    answer:
      "You simply select your current mood category and add a brief note. The application will save this *log* in Local Storage, and you can view your mood history or statistics anytime as long as you use the same browser.",
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
          Help Center
        </h1>
        <p className="text-center text-gray-500 mb-10 text-lg">
          Everything you need to know about how this website works.
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
      </div>
    </div>
  );
}
