"use client"
import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { ages, genders } from "@/utils/constants";

const DropDown = ({ label, options, selectedOption, setSelectedOption }) => {
  return (
    <div className="w-full flex ">
      <label className="my-2 gap-2 md:items-center flex flex-col md:flex-row">
       <span className="hidden md:block">{label}:</span> 
        <select
        className="text-white  px-4 py-2 rounded-lg bg-slate-800"
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
          }}
        >
          {options.map(({ id, value }) => (
            <option key={id} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

const Filter = ({
  value,
  handleValueChange,
  selectedAge,
  setSelectedAge,
  selectedGender,
  setSelectedGender,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-2 items-center w-full px-16 lg:px-72">
      <div className="flex gap-2">
      <DropDown
        
        label="Age"
        options={ages}
        selectedOption={selectedAge}
        setSelectedOption={setSelectedAge}
      />
      <DropDown
        label="Gender"
        options={genders}
        selectedOption={selectedGender}
        setSelectedOption={setSelectedGender}
      />
      </div>
     
      <Datepicker value={value} onChange={handleValueChange} />
    </div>
  );
};

export default Filter;
