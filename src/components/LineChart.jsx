"use client"
import React from "react";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJs.register(
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  Tooltip,
  zoomPlugin
);

const LineChart = ({ lineData, selectedIndex }) => {
  const newLineData = lineData.slice(1, 105);
  const lineChartData = newLineData.map(({ Features }) => Features);

  const selectedBarDataPoints = lineChartData.map(
    (dataPoint) => dataPoint[selectedIndex]
  );

  const lineDate = newLineData.map(({ Day }) => {
    try {
      const date = new Date(Day);
      const options = { day: "numeric", month: "short" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return null;
    }
  });

  const data = {
    labels: lineDate,
    datasets: [
      {
        label: "Line Chart",
        data: selectedBarDataPoints,
        backgroundColor: "#60a5fa",
        borderColor: "#60a5fa",
        pointBorderColor: "#60a5fa",
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time Range",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
      },
    },

    plugins: {
      datalabels: {
        display: false,
      },
      zoom: {
        pan: {
          enabled: true,
        },
        zoom: {
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
  };
  return <Line data={data} options={options} />;
};

export default LineChart;
