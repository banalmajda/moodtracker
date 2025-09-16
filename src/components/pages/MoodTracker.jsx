import MainLayout from "../layout/MainLayout";
import React, { useState } from "react";

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
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [note, setNote] = useState("");
  const [history, setHistory] = useState(initialHistory);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

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
      date: "16-09-2025", // Tanggal hari ini
      emotion: selectedEmotion,
      note: note,
    };

    // Tambahkan entri baru ke riwayat
    setHistory([newEntry, ...history]);

    // Reset form
    setSelectedEmotion(null);
    setNote("");
    setCurrentPage(1); // Kembali ke halaman pertama setelah submit
  };

  // Logika pagination
  const totalPages = Math.ceil(history.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentHistory = history.slice(startIndex, startIndex + rowsPerPage);

  return (
    <MainLayout>
      <div className="flex justify-center items-start min-h-screen p-5 bg-gray-100">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200">
            <h1 className="text-2xl font-bold text-gray-700">Mood tracker</h1>
            <span className="text-sm text-gray-500">16-09-2025</span>
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

          {/* Mood History Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-600 mb-4">
              Mood History
            </h2>
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
                  {currentHistory.map((entry, index) => (
                    <tr key={index}>
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
                  ))}
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
                disabled={currentPage === totalPages}
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
