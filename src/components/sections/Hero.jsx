import React, { useState, useEffect, useCallback } from "react";
import Container from "../layout/Container.jsx";
import Button from "../ui/Button.jsx";

// --- Komponen Skeleton Loader ---
const SliderSkeleton = () => {
  return (
    <main className="bg-[#D8E8DB] relative overflow-hidden">
      <Container className="flex flex-col md:flex-row justify-center md:justify-between md:items-stretch md:min-h-[80vh] rounded-lg px-4 md:px-8 lg:px-28">
        {/* Konten Teks Skeleton */}
        <div className="w-full h-[300px] md:h-auto gap-4 md:gap-8 flex flex-col justify-center rounded-bl-lg p-4 md:p-6 text-center md:text-left animate-pulse">
          {/* Skeleton untuk Title 1 & 2 */}
          <div className="h-10 bg-gray-300 rounded w-3/4 mx-auto md:mx-0"></div>
          <div className="h-10 bg-gray-300 rounded w-1/2 mt-2 mx-auto md:mx-0"></div>

          {/* Skeleton untuk Description */}
          <div className="h-4 bg-gray-300 rounded w-full mt-4"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>

          {/* Skeleton untuk Button */}
          <div className="flex justify-center md:justify-start mt-6">
            <div className="h-10 w-32 bg-gray-400 rounded-lg"></div>
          </div>
        </div>

        {/* Konten Gambar Skeleton */}
        <div className="bg-gray-200 w-full p-6 flex items-center justify-center animate-pulse">
          {/* Placeholder untuk Image */}
          <div className="h-[250px] w-full md:w-[500px] md:h-[400px] bg-gray-300 rounded-lg"></div>
        </div>
      </Container>

      {/* Skeleton untuk Navigation Buttons */}
      <div className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-300/50 rounded-r-lg p-3 md:p-4 w-8 h-10"></div>
      <div className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-300/50 rounded-l-lg p-3 md:p-4 w-8 h-10"></div>
    </main>
  );
};
// ------------------------------------

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [apiSlidesData, setApiSlidesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State baru untuk mengontrol class transisi
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Fungsi untuk mengganti slide dengan transisi (Memperbaiki Warning dengan useCallback)
  // currentSlide ditambahkan sebagai dependency agar nextIndex bisa membandingkan dengan nilai terbaru
  const handleSlideChange = useCallback(
    (newSlideIndex) => {
      const nextIndex =
        typeof newSlideIndex === "function"
          ? newSlideIndex(currentSlide)
          : newSlideIndex;

      if (nextIndex === currentSlide) return; // Hindari transisi jika index sama

      // 1. Mulai transisi fade out
      setIsTransitioning(true);

      // 2. Setelah durasi transisi (misalnya 500ms), update slide dan set fade in
      setTimeout(() => {
        // Terapkan index slide baru
        setCurrentSlide(nextIndex);
        // Selesai transisi
        setIsTransitioning(false);
      }, 500); // Sesuaikan dengan durasi transisi di CSS (misalnya duration-500)
    },
    [currentSlide]
  ); // <<< currentSlide adalah DEPENDENCY dari useCallback

  // Effect untuk fetching data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxJtCLaOm7XXfgsnte2T1JmAkR5PgdaheuITC1SSx0QLW40wCT5krHezRnremGy11xxNQ/exec"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setApiSlidesData(data);
      } catch (e) {
        setError("Failed to fetch data. Please check the URL.");
        console.error("Fetching error: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Effect untuk slider otomatis (Memperbaiki Warning dengan menambahkan handleSlideChange)
  useEffect(() => {
    if (apiSlidesData.length > 0) {
      const interval = setInterval(() => {
        // Panggil handleSlideChange yang sudah di-memoize oleh useCallback
        handleSlideChange(
          (prevSlide) => (prevSlide + 1) % apiSlidesData.length
        );
      }, 3000); // Interval 3 detik
      return () => clearInterval(interval);
    }
  }, [apiSlidesData.length, handleSlideChange]); // <<< handleSlideChange adalah DEPENDENCY dari useEffect

  const nextSlide = () => {
    handleSlideChange((prevSlide) => (prevSlide + 1) % apiSlidesData.length);
  };

  const prevSlide = () => {
    handleSlideChange(
      (prevSlide) =>
        (prevSlide - 1 + apiSlidesData.length) % apiSlidesData.length
    );
  };

  // Conditional Rendering
  if (loading) {
    // Tampilkan Skeleton Loader saat loading
    return <SliderSkeleton />;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (apiSlidesData.length === 0) {
    return <div className="text-center py-20">No slides available.</div>;
  }

  // Class untuk mengontrol opacity
  const transitionClasses = `transition-opacity duration-500 ease-in-out ${
    isTransitioning ? "opacity-0" : "opacity-100"
  }`;

  return (
    <main className="bg-[#D8E8DB] relative overflow-hidden">
      {" "}
      {/* Tambahkan relative dan overflow-hidden */}
      <Container className="flex flex-col md:flex-row justify-center md:justify-between  md:items-stretch md:min-h-[80vh] rounded-lg px-4 md:px-8 lg:px-28  ">
        {/* Konten Teks: Tambahkan class transisi di sini */}
        <div
          className={`w-full h-[300px] md:h-auto gap-4 md:gap-8 flex flex-col justify-center rounded-bl-lg p-4 md:p-6 text-center md:text-left ${transitionClasses}`}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
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

        {/* Konten Gambar: Tambahkan class transisi di sini */}
        <div
          className={`w-full p-6 flex items-center justify-center ${transitionClasses}`}
        >
          <img
            className="h-auto w-full md:w-[500px] md:h-[400px] object-cover rounded-lg"
            src={apiSlidesData[currentSlide]?.image}
            alt="Hero Image"
          />
        </div>
      </Container>
      {/* Navigation Buttons and Indicators (tetap sama) */}
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
    </main>
  );
};

export default Slider;
