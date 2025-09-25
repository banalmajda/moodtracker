import React, { useState, useEffect } from "react";
import Container from "../layout/Container.jsx";
import Button from "../ui/Button.jsx";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [apiSlidesData, setApiSlidesData] = useState([]); // State untuk data dari API
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk error

  // Effect untuk fetching data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxJtCLaOm7XXfgsnte2T1JmAkR5PgdaheuITC1SSx0QLW40wCT5krHezRnremGy11xxNQ/exec"
        ); // Ganti dengan URL API Anda
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setApiSlidesData(data); // Simpan data ke state
      } catch (e) {
        setError("Failed to fetch data. Please check the URL."); // Atur state error
        console.error("Fetching error: ", e);
      } finally {
        setLoading(false); // Selesai loading, baik sukses atau gagal
      }
    };
    fetchData();
  }, []); // [] agar effect hanya berjalan sekali saat komponen mount

  // Effect untuk slider otomatis (hanya berjalan jika data sudah ada)
  useEffect(() => {
    if (apiSlidesData.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % apiSlidesData.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [apiSlidesData]); // Bergantung pada apiSlidesData

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % apiSlidesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + apiSlidesData.length) % apiSlidesData.length
    );
  };

  // Conditional Rendering
  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (apiSlidesData.length === 0) {
    return <div className="text-center py-20">No slides available.</div>;
  }

  // Render komponen utama setelah data berhasil di-fetch
  return (
    <main className="bg-[#D8E8DB] relative overflow-hidden">
      <Container className="flex flex-col md:flex-row justify-center md:justify-between items-center md:min-h-[80vh] rounded-lg px-4 md:px-8 lg:px-28 pt-20 md:pt-20">
        <div className="w-full gap-4 md:gap-8 flex flex-col justify-between rounded-bl-lg p-4 md:p-6 bg-[#D8E8DB] text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-[#DE946E]">
              {apiSlidesData[currentSlide]?.title1}
              <br />
            </span>
            {apiSlidesData[currentSlide]?.title2}
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-700">
            {apiSlidesData[currentSlide]?.description}
          </p>
          <div className="flex justify-center md:justify-start">
            <Button>
              <a href="/tracking">{apiSlidesData[currentSlide]?.text_button}</a>
            </Button>
          </div>
        </div>

        <div className="bg-[#D8E8DB] w-full p-4 flex justify-center">
          <img
            className="h-auto w-full md:w-auto md:h-full max-w-sm md:max-w-none"
            src={apiSlidesData[currentSlide]?.image}
            alt="Hero Image"
          />
        </div>
      </Container>

      {/* Navigation Buttons and Indicators */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-200/50 hover:bg-gray-300/75 text-gray-700 rounded-r-lg p-2 md:p-3 transition-colors duration-300 z-10"
        aria-label="Previous Slide"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-200/50 hover:bg-gray-300/75 text-gray-700 rounded-l-lg p-2 md:p-3 transition-colors duration-300 z-10"
        aria-label="Next Slide"
      >
        &#10095;
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-4 space-x-2 pb-8 md:pb-0">
        {apiSlidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-300 ${
              currentSlide === index ? "bg-gray-800" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </main>
  );
};

export default Slider;
