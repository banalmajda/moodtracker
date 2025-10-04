import React, { useState, useEffect } from "react";
import Container from "../layout/Container.jsx";
import IconBenefit, {
  Awareness,
  Manage,
  Build,
  Become,
} from "../icons/IconBenefit.jsx";
const slidesData = [
  {
    icon: <Awareness />,
    title: "Boost Emotional Awareness",
    description:
      "Helps you become more in tune with your feelings and understand why they arise.",
  },
  {
    icon: <Manage />,
    title: "Manage Stress and Anxiety",
    description:
      "By understanding your triggers, you can take proactive steps to manage or avoid situations that cause stress.",
  },
  {
    icon: <Build />,
    title: "Build Positive Habits",
    description:
      "Encourages self-reflection and helps you focus on things that make you feel good.",
  },
  {
    icon: <Become />,
    title: "Become a Better Version of Yourself",
    description:
      "With the insights you get, you can make better choices for your mental health and overall quality of life.",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Efek untuk slider otomatis
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
    }, 3000); // Ganti slide setiap 3 detik

    return () => clearInterval(interval); // Membersihkan interval saat komponen di-unmount
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slidesData.length) % slidesData.length
    );
  };

  return (
    <Container className="px-4 sm:px-10 lg:px-28 mt-10">
      <div className="p-6 ">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold text-[#1D493C]">
          Benefits for Users
        </h1>
        <div className="relative w-full flex flex-col justify-between rounded-2xl shadow-xl p-6 my-8">
          {/* Container Slide */}
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="text-center h-[300px] transition-opacity duration-700 ease-in-out">
              <div className="flex justify-center mb-4">
                {slidesData[currentSlide].icon}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#DE946E] mb-2">
                {slidesData[currentSlide].title}
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                {slidesData[currentSlide].description}
              </p>
            </div>
          </div>

          {/* Tombol Navigasi */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200/50 hover:bg-gray-300/75 text-gray-700 rounded-r-lg p-3 transition-colors duration-300 z-10"
            aria-label="Previous Slide"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200/50 hover:bg-gray-300/75 text-gray-700 rounded-l-lg p-3 transition-colors duration-300 z-10"
            aria-label="Next Slide"
          >
            &#10095;
          </button>

          {/* Titik Indikator */}
          <div className="flex justify-center mt-4 space-x-2">
            {slidesData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index ? "bg-gray-800" : "bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Slider;
