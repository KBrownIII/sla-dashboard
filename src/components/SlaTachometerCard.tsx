import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SlaTachometerCardProps {
  label: string;
  value: number;
  slaThreshold: number;
  unit?: string;
}

export const SlaTachometerCard: React.FC<SlaTachometerCardProps> = ({
  label,
  value,
  slaThreshold,
  unit = 'ms',
}) => {
  const percentage = Math.min(value / slaThreshold, 1);
  const color = value <= slaThreshold ? '#22c55e' : '#ef4444';

  const data = {
    datasets: [
      {
        data: [percentage, 1 - percentage],
        backgroundColor: [color, '#e5e7eb'],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: '80%',
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 w-64 h-48 flex flex-col items-center justify-center">
      <h2 className="text-lg font-semibold mb-2">{label}</h2>
      <div className="relative w-full h-full">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">
            {value.toFixed(0)} {unit}
          </span>
          <span className="text-sm text-gray-500">
            SLA: {slaThreshold} {unit}
          </span>
        </div>
      </div>
    </div>
  );
};

