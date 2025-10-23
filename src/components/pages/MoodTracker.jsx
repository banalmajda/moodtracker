import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout.jsx";
import MoodChart from "../sections/Chart.jsx";

// Data dummy untuk riwayat mood
const initialHistory = []; // Mulai dengan array kosong

const MoodTracker = () => {
  // State to store mood history, initialized from localStorage or dummy data
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [note, setNote] = useState("");
  const [history, setHistory] = useState(() => {
    try {
      const storedHistory = localStorage.getItem("moodHistory");
      return storedHistory ? JSON.parse(storedHistory) : initialHistory;
    } catch (error) {
      console.error(
        "Failed to parse stored mood history, using initial data.",
        error
      );
      return initialHistory;
    }
  });

  // States for month and year filters
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const currentYear = new Date().getFullYear().toString();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  // Use useEffect to save data to localStorage whenever the `history` state changes
  useEffect(() => {
    try {
      localStorage.setItem("moodHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save mood history to local storage.", error);
    }
  }, [history]);

  const emojiMap = {
    Smiling: "😀",
    Happy: "😊",
    Neutral: "😐",
    Sad: "😟",
    Anxious: "😥",
    Angry: "😡",
  };

  const emotionColors = {
    Smiling: "bg-yellow-300",
    Happy: "bg-lime-300",
    Neutral: "bg-gray-400",
    Sad: "bg-sky-400",
    Anxious: "bg-red-300",
    Angry: "bg-orange-400",
  };

  const handleSubmit = () => {
    if (!selectedEmotion || !note) {
      alert("Please select an emotion and write a note.");
      return;
    }

    const newEntry = {
      date: new Date()
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-"), // Automatically get today's date in DD-MM-YYYY format
      emotion: selectedEmotion,
      note: note,
    };

    setHistory([newEntry, ...history]);

    setSelectedEmotion(null);
    setNote("");
    // Reset filters and go back to page 1 after submission
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
    setCurrentPage(1);
  };

  // Filter history based on selected month and year
  const filteredHistory = history.filter((entry) => {
    const [day, month, year] = entry.date.split("-");
    const entryDate = new Date(`${year}-${month}-${day}`);
    const entryMonth = entryDate.toLocaleString("en-US", { month: "long" });
    const entryYear = entryDate.getFullYear().toString();

    return entryMonth === selectedMonth && entryYear === selectedYear;
  });

  // Calculate total mood counts for the overview
  const moodCounts = filteredHistory.reduce((counts, entry) => {
    counts[entry.emotion] = (counts[entry.emotion] || 0) + 1;
    return counts;
  }, {});

  // Ganti bagian ini:
  // const sortedMoods = Object.entries(moodCounts).sort(([, a], [, b]) => b - a);

  // Dengan kode baru di bawah ini:
  const allMoodsWithCounts = Object.entries(emojiMap).map(
    ([emotion, emoji]) => {
      const count = moodCounts[emotion] || 0;
      return {
        emotion,
        emoji,
        count,
      };
    }
  );

  const sortedMoods = allMoodsWithCounts.sort((a, b) => b.count - a.count);
  // Sort mood counts from highest to lowest

  const totalEntries = filteredHistory.length;
  const chartData = allMoodsWithCounts.map((mood) => {
    const colorTailwind = emotionColors[mood.emotion]; // e.g., 'bg-yellow-300' // Ambil hanya kode warna, karena recharts membutuhkan kode hex/nama warna, bukan kelas Tailwind.
    // Karena Anda menggunakan Tailwind, untuk sementara kita akan memetakan kelas ke warna dasar,
    // tetapi yang terbaik adalah menggunakan map warna terpisah dengan nilai HEX.
    let colorHex = "#ccc"; // Default abu-abu
    if (colorTailwind.includes("yellow"))
      colorHex = "#fcd34d"; // Tailwind yellow-300
    else if (colorTailwind.includes("lime"))
      colorHex = "#a3e635"; // Tailwind lime-300
    else if (colorTailwind.includes("gray"))
      colorHex = "#9ca3af"; // Tailwind gray-400
    else if (colorTailwind.includes("sky"))
      colorHex = "#38bdf8"; // Tailwind sky-400
    else if (colorTailwind.includes("red"))
      colorHex = "#fca5a5"; // Tailwind red-300
    else if (colorTailwind.includes("orange")) colorHex = "#fb923c"; // Tailwind orange-400

    return {
      ...mood,
      percentage:
        totalEntries > 0 ? ((mood.count / totalEntries) * 100).toFixed(1) : 0,
      color: colorHex, // Gunakan warna hex untuk recharts
    };
  });

  // Generate month and year options
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = [
    ...new Set(history.map((entry) => entry.date.split("-")[2])),
  ].sort((a, b) => b - a);
  if (!years.includes(currentYear)) {
    years.unshift(currentYear);
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredHistory.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentHistory = filteredHistory.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <MainLayout>
      <div className="flex justify-center items-start min-h-screen p-5 bg-gray-100 pt-20">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200">
            <h1 className="text-2xl font-bold text-gray-700">Mood tracker</h1>
            <span className="text-sm text-gray-500">
              {new Date()
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, "-")}
            </span>
          </div>
          {/* Mood Input Section */}
          <div className="flex justify-between">
            {/* Container yang membungkus semua emoji */}
            <div
              className="
            flex 
            justify-center 
            gap-2 
            w-full           /* Ambil lebar penuh di mobile */
            sm:gap-3         /* Spasi sedikit lebih besar di tablet */
            md:gap-4         /* Spasi standar di desktop */
        "
            >
              {Object.entries(emojiMap).map(([emotion, emoji]) => (
                <div
                  key={emotion}
                  title={emotion}
                  className={`
                    /* UKURAN DEFAULT (MOBILE) */
                    w-10 h-10 text-2xl     /* Ukuran lebih kecil untuk mobile agar muat 5-6 emoji */
                    sm:w-12 sm:h-12 sm:text-3xl /* Ukuran sedang di tablet */
                    md:w-14 md:h-14 md:text-3xl /* Ukuran besar di desktop */

                    rounded-full 
                    flex 
                    items-center 
                    justify-center 
                    cursor-pointer 
                    transition-transform 
                    duration-200
                    
                    ${emotionColors[emotion]}
                    ${
                      selectedEmotion === emotion
                        ? "ring-4 ring-blue-500 scale-110"
                        : "hover:scale-110"
                    }
                `}
                  onClick={() => setSelectedEmotion(emotion)}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
          {/* Note Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">Note</h2>
            <textarea
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your note here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          {/* Submit Button */}
          <button
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {/* Filter and Overview Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-600 mb-4">
              Mood History Overview
            </h2>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Filters */}
              <div className="flex space-x-2">
                <select
                  className="p-2 border rounded-lg"
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    setCurrentPage(1); // Reset page to 1 on filter change
                  }}
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  className="p-2 border rounded-lg"
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setCurrentPage(1); // Reset page to 1 on filter change
                  }}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mood Overview */}
              <div className="flex space-x-2">
                {sortedMoods.map((mood) => (
                  <div
                    key={mood.emotion}
                    className="flex items-center space-x-1"
                  >
                    <span className="text-xl">{mood.emoji}</span>
                    <span className="text-sm font-semibold text-gray-700">
                      {mood.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Mood Chart Section - PERBAIKAN TATA LETAK */}
          {/* Hapus h-full yang tidak perlu. Gunakan p-6/p-8 untuk padding besar. */}

          <div className="mt-6 mb-8 p-4 border rounded-lg bg-green-100 shadow-md">
            <h2 className="text-lg font-semibold text-blue-600 mb-2">
              Mood Distribution Chart
            </h2>
            {/* Kontainer Chart: Beri ruang yang cukup dan hapus tinggi tetap yang membatasi */}

            <div className="w-full h-48 md:h-56 mb-4">
              <MoodChart data={chartData} totalEntries={totalEntries} />
            </div>
            {/* Legenda Manual Dibuat di Sini untuk Penempatan yang Rapi (Hapus legenda di MoodChart.jsx) */}

            <div className="w-full mt-2 pt-2 border-t border-green-200 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
              {chartData
                .filter((mood) => mood.count > 0) // Hanya tampilkan mood yang benar-benar ada
                .map((mood) => (
                  <div key={mood.emotion} className="flex items-center">
                    {/* Kotak Warna/Indikator */}
                    <span
                      className="w-3 h-3 rounded-full mr-2 shadow-sm"
                      style={{ backgroundColor: mood.color }}
                    ></span>
                    {/* Teks Legenda */}
                    <span className="text-gray-700 font-medium whitespace-nowrap">
                      {mood.emotion}: {mood.percentage}%
                    </span>
                  </div>
                ))}
            </div>
          </div>
          {/* End Mood Chart Section */}
          {/* Mood History Table */}
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Emotion
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentHistory.length > 0 ? (
                    currentHistory.map((entry, index) => (
                      <tr key={startIndex + index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.emotion}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {entry.note}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No mood entries found for this period.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center mt-4 space-x-2">
              <button
                className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === totalPages || filteredHistory.length === 0
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MoodTracker;
