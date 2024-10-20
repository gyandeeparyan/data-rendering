"use client"
import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { ages, genders } from "@/utils/constants";

const DropDown = ({ label, options, selectedOption, setSelectedOption }) => {
  return (
    <div className="w-full flex ">
      <label className="mx-2">
        {label}:
        <select
        className="text-white mx-2 px-4 py-2 rounded-lg bg-slate-800"
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
    <div className="flex gap-6 items-center w-full px-72">
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
      <Datepicker value={value} onChange={handleValueChange} />
    </div>
  );
};

export default Filter;
