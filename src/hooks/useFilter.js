import { useEffect, useState } from "react";
import { useGetData } from "./useGetData";
import { dateFormat, dateRangeFormat } from "../utils/dateFormat";

export const useFilter = () => {
  const [selectedAge, setSelectedAge] = useState("15-25");
  const [selectedGender, setSelectedGender] = useState("Male");
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: "2022-10-01",
    endDate: "2022-10-31",
  });

  const { data, filteredData, setFilteredData } = useGetData();

  const handleValueChange = (newValue) => {
    setSelectedDateRange(newValue);
  };

  const { startDate, endDate } = selectedDateRange;

  const selectedData = data.slice(1, data.length - 1);

  const filterByAge = selectedData.filter(({ Age }) => Age === selectedAge);

  const filterByGender = filterByAge.filter(
    ({ Gender }) => Gender === selectedGender
  );

  let filteredByDateRange = filterByGender.filter(({ Day }) => {
    const date = dateFormat(Day);
    const initialDate = dateRangeFormat(startDate);
    const lastDate = dateRangeFormat(endDate);
    return date >= initialDate && date <= lastDate;
  });

  if (filteredByDateRange[0] !== undefined) {
    filteredByDateRange = [data[0], ...filteredByDateRange];
  }

  useEffect(() => {
    if (JSON.stringify(filteredByDateRange) !== JSON.stringify(filteredData)) {
      setFilteredData(filteredByDateRange);
    }
  }, [filteredByDateRange, filteredData]);

  return {
    selectedAge,
    setSelectedAge,
    selectedGender,
    setSelectedGender,
    selectedDateRange,
    handleValueChange,
    filteredData,
  };
};
