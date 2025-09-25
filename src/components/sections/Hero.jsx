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
    <main className="bg-[#D8E8DB]">
      <Container className="flex flex-row justify-between max-h-[80vh] rounded-lg px-28 pt-20">
        <div className="w-full gap-8 flex flex-col justify-between rounded-bl-lg p-6 bg-[#D8E8DB]">
          <h1 className="text-5xl font-bold leading-tight">
            <span className="text-[#DE946E]">
              {apiSlidesData[currentSlide]?.title1}
              <br />
            </span>
            {apiSlidesData[currentSlide]?.title2}
          </h1>
          <p className="text-lg text-gray-700">
            {apiSlidesData[currentSlide]?.description}
          </p>
          <div>
            <Button>
              <a href="/tracking">{apiSlidesData[currentSlide]?.text_button}</a>
            </Button>
          </div>
        </div>

        <div className="bg-[#D8E8DB] w-full">
          <img
            className="h-full w-auto p-4"
            src={apiSlidesData[currentSlide]?.image}
            alt="Hero Image"
          />
        </div>
      </Container>

      {/* Tombol Navigasi dan Indikator */}
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
        {apiSlidesData.map((_, index) => (
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
    </main>
  );
};

export default Slider;
