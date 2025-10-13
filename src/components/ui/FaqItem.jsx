// src/ui/FaqItem.jsx

import React from "react";

// Menerima props 'question', 'answer', 'isOpen', dan 'onClick'
export default function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      {/* Tombol Pertanyaan (Header Accordion) */}
      <button
        className={`flex justify-between items-center w-full p-5 text-lg font-semibold text-left transition duration-300 ease-in-out 
          ${
            isOpen
              ? "bg-indigo-50 text-[#DE946E]"
              : "bg-white hover:bg-gray-50 text-gray-800"
          }`}
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        {/* Ikon Toggle */}
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#DE946E]" : "text-gray-500"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {/* Konten Jawaban */}
      <div
        className="overflow-hidden transition-max-height duration-500 ease-in-out"
        style={{ maxHeight: isOpen ? "250px" : "0" }}
      >
        <p className="p-5 text-gray-600 leading-relaxed bg-gray-50 border-t border-gray-200">
          {answer}
        </p>
      </div>
    </div>
  );
}
