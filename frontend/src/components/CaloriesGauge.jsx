import React from "react";
import { RadialBarChart, RadialBar, Legend } from "recharts";

const CaloriesGauge = ({ todayCalories, threshold }) => {
  const percentage = Math.min((todayCalories / threshold) * 100, 100);

  const data = [
    {
      name: "Consommé",
      value: percentage,
      fill: "#FF7F50"
    }
  ];

  return (
    <div className="mt-6 text-center">
      <h3 className="text-lg font-semibold mb-2">Suivi calorique du jour</h3>
      <RadialBarChart
        width={250}
        height={250}
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="100%"
        barSize={20}
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar
          minAngle={15}
          background
          clockWise
          dataKey="value"
        />
        <Legend
          iconSize={10}
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </RadialBarChart>
      <p>
        {todayCalories} / {threshold} kcal
      </p>
    </div>
  );
};

export default CaloriesGauge;
