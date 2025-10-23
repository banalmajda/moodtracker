import React from "react";
// Import komponen yang diperlukan dari Recharts
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

/**
 * Komponen Tooltip Kustom untuk menampilkan detail mood (Count dan Percentage).
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-2 bg-white border border-gray-300 shadow-lg rounded-lg text-sm">
        <p className="font-semibold text-gray-800">
          {data.emotion} ({data.emoji})
        </p>
        <p className="text-blue-600">Count: {data.count}</p>
        <p className="text-green-600">Percentage: {data.percentage}%</p>
      </div>
    );
  }
  return null;
};

/**
 * Komponen Legend Kustom untuk menampilkan mood yang ada dan persentasenya.
 */
const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 p-2 mt-4">
      {payload.map((entry, index) => {
        const data = entry.payload;
        // Hanya tampilkan mood yang memiliki count > 0
        if (data.count === 0) return null;

        return (
          <div
            key={`item-${index}`}
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: data.color }}
            ></div>
            {data.emotion} ({data.percentage}%)
          </div>
        );
      })}
    </div>
  );
};

const MoodChart = ({ data, totalEntries }) => {
  // Pastikan 'data' adalah array sebelum memanggil filter
  const chartData = (data || []).filter((d) => d.count > 0);

  const safeTotalEntries = totalEntries || 0;

  if (safeTotalEntries === 0 || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full text-lg text-gray-500">
        No entries yet for chart display.
      </div>
    );
  }

  return (
    // ResponsiveContainer memastikan chart menyesuaikan ukuran container
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="emotion"
          cx="50%" // Center X position
          cy="50%" // Center Y position
          outerRadius={80} // Radius luar Pie Chart
          fill="#8884d8"
          labelLine={false}
          // Menggunakan payload untuk mendapatkan nama emosi di label
          label={({ payload, percent }) => {
            const emotionName = payload.emotion;
            const percentage = (percent * 100).toFixed(0);
            return `${emotionName}: ${percentage}%`;
          }}
        >
          {/* Menggunakan Cell untuk mengatur warna berdasarkan data */}
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              stroke={entry.color}
              strokeWidth={2}
            />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MoodChart;
