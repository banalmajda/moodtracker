import React, { useState, useEffect } from "react";

// Data dummy untuk riwayat mood
const initialHistory = [
  { date: "15-09-2025", emotion: "Smiling", note: "Watched a good movie." },
  {
    date: "13-09-2025",
    emotion: "Neutral",
    note: "Missed my bus this morning.",
  },
  { date: "12-09-2025", emotion: "Happy", note: "Tried a new cafe." },
  { date: "11-09-2025", emotion: "Anxious", note: "Deadline approaching." },
  { date: "10-09-2025", emotion: "Smiling", note: "Had a great day at work." },
  { date: "09-09-2025", emotion: "Sad", note: "Felt a bit down." },
  { date: "08-09-2025", emotion: "Angry", note: "Traffic was terrible." },
  { date: "07-09-2025", emotion: "Happy", note: "Went out with friends!" },
  { date: "06-09-2025", emotion: "Smiling", note: "Got good news." },
  { date: "05-09-2025", emotion: "Neutral", note: "Just a normal day." },
  {
    date: "04-09-2025",
    emotion: "Sad",
    note: "Felt a bit down in the morning.",
  },
  { date: "03-09-2025", emotion: "Happy", note: "Went out with friends!" },
  { date: "02-09-2025", emotion: "Smiling", note: "Got good news." },
  { date: "01-09-2025", emotion: "Anxious", note: "Deadline approaching." },
  { date: "30-08-2025", emotion: "Neutral", note: "Lazy Sunday." },
  { date: "29-08-2025", emotion: "Smiling", note: "A productive day." },
  { date: "28-08-2025", emotion: "Neutral", note: "Weather was so-so." },
  { date: "27-08-2025", emotion: "Sad", note: "Lost my keys." },
  { date: "26-08-2025", emotion: "Happy", note: "Tried a new cafe." },
  { date: "25-08-2025", emotion: "Smiling", note: "Received a gift." },
  {
    date: "24-08-2025",
    emotion: "Neutral",
    note: "Missed my bus this morning.",
  },
  {
    date: "23-08-2025",
    emotion: "Anxious",
    note: "Big presentation tomorrow.",
  },
  { date: "22-08-2025", emotion: "Smiling", note: "Watched a good movie." },
  { date: "21-08-2025", emotion: "Smiling", note: "Started a new project." },
  { date: "20-08-2025", emotion: "Neutral", note: "Nothing special happened." },
  { date: "19-08-2025", emotion: "Happy", note: "Spent time with family." },
  { date: "18-08-2025", emotion: "Sad", note: "Feeling under the weather." },
  { date: "17-08-2025", emotion: "Smiling", note: "Finished a book I liked." },
  { date: "16-08-2025", emotion: "Neutral", note: "Just relaxing at home." },
  { date: "15-08-2025", emotion: "Anxious", note: "Got a tough assignment." },
  {
    date: "14-08-2025",
    emotion: "Happy",
    note: "Finally solved a tricky problem.",
  },
];

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
    // Reset filters to the current month/year after submission
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
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

  return (
    <div className="flex justify-center items-start min-h-screen p-5 bg-gray-100">
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
                onChange={(e) => setSelectedMonth(e.target.value)}
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
                onChange={(e) => setSelectedYear(e.target.value)}
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
              {Object.entries(emojiMap).map(([emotion, emoji]) => (
                <div key={emotion} className="flex items-center space-x-1">
                  <span className="text-xl">{emoji}</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {moodCounts[emotion] || 0}
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
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
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
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
// End of file MoodTracker.jsx
