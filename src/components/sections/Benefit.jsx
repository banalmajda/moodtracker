import React, { useState, useEffect } from "react";

const benefits = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-12 h-12 text-blue-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 20.25c0 .354-.42 3.75-2.25 3.75s-2.25-3.75-2.25-3.75M16 20.25c0 .354-.42 3.75-2.25 3.75s-2.25-3.75-2.25-3.75M6.75 16.5c-3.795-1.423-6.75-3.923-6.75-6.75 0-3.328 4.721-6 10.5-6s10.5 2.672 10.5 6c0 2.827-2.955 5.327-6.75 6.75M12 9v6m0-3h3m-3 0h-3"
        />
      </svg>
    ),
    title: "Meningkatkan Kesadaran Emosional",
    description:
      "Membantu Anda menjadi lebih selaras dengan perasaan dan memahami alasannya.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-12 h-12 text-green-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.52 3.29a2.5 2.5 0 011.83.693l6.58 6.58a2.5 2.5 0 010 3.535L15 20.535A2.5 2.5 0 0111.465 24H2.5A2.5 2.5 0 010 21.5V13.5a2.5 2.5 0 01.695-1.83l6.58-6.58a2.5 2.5 0 013.535 0zM12 11a1 1 0 100-2 1 1 0 000 2z"
        />
      </svg>
    ),
    title: "Kelola Stres dan Kecemasan",
    description:
      "Dengan memahami pemicu, Anda dapat mengambil langkah proaktif untuk mengelola atau menghindari situasi penyebab stres.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-12 h-12 text-yellow-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.5a9.5 9.5 0 100-19 9.5 9.5 0 000 19zM12 16.5v-4.5m0 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 7.5v-2m0 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
    ),
    title: "Bangun Kebiasaan Positif",
    description:
      "Mendorong refleksi diri dan membantu Anda fokus pada hal-hal yang membuat Anda merasa baik.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-12 h-12 text-purple-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.75c-3.328 0-6.27-.582-8.5-1.725a.75.75 0 01-.25-.75c0-.495.27-.923.75-1.25a6 6 0 014.5-2.25c.875 0 1.625.125 2.25.375s1.25.625 1.75 1.125c.5.5.875 1.125 1.125 1.75s.375 1.375.375 2.25a6 6 0 01-2.25 4.5c-.327.48-.75.75-1.25.75a.75.75 0 01-.75-.25c-1.143-2.23-1.725-5.172-1.725-8.5M12 9a6 6 0 100-12 6 6 0 000 12z"
        />
      </svg>
    ),
    title: "Menjadi Versi Diri yang Lebih Baik",
    description:
      "Dengan wawasan yang Anda dapatkan, Anda dapat membuat pilihan yang lebih baik untuk kesehatan mental dan kualitas hidup secara keseluruhan.",
  },
];

const BenefitSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideDuration = 5000; // 5 detik

  // Mengatur slider otomatis
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % benefits.length);
    }, slideDuration);

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(slideInterval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % benefits.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + benefits.length) % benefits.length
    );
  };

  const calculateTransform = () => {
    return `translateX(-${currentSlide * 100}%)`;
  };

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Manfaat untuk Pengguna
      </h1>

      <div className="relative slider-container rounded-xl shadow-lg overflow-hidden">
        <div
          id="slider"
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: calculateTransform() }}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="min-w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
            >
              <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {benefit.title}
                </h2>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="slider-button absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="slider-button absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BenefitSlider;
