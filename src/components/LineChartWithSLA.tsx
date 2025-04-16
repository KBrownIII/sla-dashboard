import React from 'react';
import { Line } from 'react-chartjs-2';

interface LineChartProps {
  timestamps: string[];
  responseTimes: number[];
  slaThreshold: number;
}

export const LineChartWithSLA: React.FC<LineChartProps> = ({
  timestamps,
  responseTimes,
  slaThreshold,
}) => {
  const data = {
    labels: timestamps,
    datasets: [
      {
        label: 'Response Time (ms)',
        data: responseTimes,
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.1,
      },
      {
        label: 'SLA Threshold',
        data: new Array(timestamps.length).fill(slaThreshold),
        borderColor: '#ef4444',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

