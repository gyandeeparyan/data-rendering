"use client"

import React from "react";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import datalabels from "chartjs-plugin-datalabels";

ChartJs.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  datalabels
);

const BarChart = ({ barData, onBarClick }) => {
  const barDatas = barData.map(({ Features }) => Features);
  const newBarData = barDatas.slice(1);

  let newBarDataSum = [];

  for (let i = 0; i < newBarData[0]?.length; i++) {
    const sum = newBarData.reduce(
      (accumulator, currentArray) => accumulator + currentArray[i],
      0
    );
    newBarDataSum.push(sum);
  }

  const data = {
    labels: barDatas[0]?.map((feature) => feature),
    datasets: [
      {
        label: "Bar Chart",
        data: newBarDataSum,
        backgroundColor: "#60a5fa",
        borderColor: "#60a5fa",
        hoverBackgroundColor: "#d97706",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",

    onClick: (e, elements) => {
      const clickedIndex = elements[0]?.index;
      if (clickedIndex !== undefined) {
        onBarClick(clickedIndex);
      }
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Total Time Spent",
        },
      },
      y: {
        title: {
          display: true,
          text: "Features",
        },
      },
    },
    plugins: {
      datalabels: {
        display: true,
        align: "end",
        anchor: "end",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
