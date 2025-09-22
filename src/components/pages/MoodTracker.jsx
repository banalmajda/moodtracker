import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout.jsx";

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

  // Sort mood counts from highest to lowest
  const sortedMoods = Object.entries(moodCounts).sort(([, a], [, b]) => b - a);

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
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">
              How are you feeling today?
            </h2>
            <div className="flex justify-between">
              {Object.entries(emojiMap).map(([emotion, emoji]) => (
                <div
                  key={emotion}
                  title={emotion} // Tooltip added here
                  className={`
                                    w-14 h-14 rounded-full flex items-center justify-center text-3xl cursor-pointer transition-transform duration-200
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
                {sortedMoods.map(([emotion, count]) => (
                  <div key={emotion} className="flex items-center space-x-1">
                    <span className="text-xl">{emojiMap[emotion]}</span>
                    <span className="text-sm font-semibold text-gray-700">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
