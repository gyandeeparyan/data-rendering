"use client"

import React, { useState } from "react";
import BarChart from "@/src/components/BarChart";
import LineChart from "@/src/components/LineChart";
import Filter from "@/src/components/Filter";
import { useFilter } from "@/src/hooks/useFilter";

const Dashboard = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const {
    selectedAge,
    setSelectedAge,
    selectedGender,
    setSelectedGender,
    selectedDateRange,
    handleValueChange,
    filteredData,
  } = useFilter();

  const handleBarClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-y-8">
        <div>
          <h1 className="font-bold mt-6 text-3xl">Interactive Dashboard</h1>
        </div>
        <Filter
          value={selectedDateRange}
          handleValueChange={handleValueChange}
          selectedAge={selectedAge}
          setSelectedAge={setSelectedAge}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
        />
      </div>

      <div className="flex justify-evenly m-8 p-8 gap-8">
        <div className="w-full h-full">
          <BarChart onBarClick={handleBarClick} barData={filteredData} />
        </div>

        <div className="w-full h-full">
          {selectedIndex !== null && (
            <LineChart lineData={filteredData} selectedIndex={selectedIndex} />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
