// components/CaloriesBarChart.jsx
import { useEffect, useState } from "react";
import axios from "../api";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CaloriesBarChart = ({ userId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`/consumption/calories_per_day?user_id=${userId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Erreur API calories par jour", err));
  }, [userId]);

  const chartData = {
    labels: data.map((item) => dayjs(item.date).format("DD/MM")),
    datasets: [
      {
        label: "Calories consommées",
        data: data.map((item) => item.calories),
        backgroundColor: "#4ade80",
        borderRadius: 4,
        barThickness: 18,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} kcal`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 500 },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-6">
      <h2 className="text-md font-bold mb-2">Calories sur les 30 derniers jours</h2>
      <Bar data={chartData} options={options} height={220} />
    </div>
  );
};

export default CaloriesBarChart;
