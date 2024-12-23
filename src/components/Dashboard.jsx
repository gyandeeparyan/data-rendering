"use client";

import React, { useState, useEffect, Suspense } from "react";
import BarChart from "@/components/BarChart";
import dynamic from "next/dynamic";
import Filter from "@/components/Filter";
import { useFilter } from "@/hooks/useFilter";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams, useRouter } from "next/navigation";
import { Copy ,SquareArrowOutUpRight,UserRoundMinus } from 'lucide-react';
const LineChart = dynamic(() => import("@/components/LineChart"), {
  ssr: false,
});
// Utility function to format dates as YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Dashboard = () => {
  const [url, setUrl] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const { user, logout } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    selectedAge,
    setSelectedAge,
    selectedGender,
    setSelectedGender,
    selectedDateRange,
    handleValueChange,
    filteredData,
  } = useFilter();

  // Set isMounted to true once the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle URL params initialization
  useEffect(() => {
    if (!isMounted) return;

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const age = searchParams.get("age");
    const gender = searchParams.get("gender");

    if (
      startDate &&
      endDate &&
      (startDate !== selectedDateRange?.startDate ||
        endDate !== selectedDateRange?.endDate)
    ) {
      handleValueChange({
        startDate: startDate,
        endDate: endDate,
      });
    }
    if (age && age !== selectedAge) {
      setSelectedAge(age);
    }
    if (gender && gender !== selectedGender) {
      setSelectedGender(gender);
    }
  }, [isMounted, searchParams]);

  // Update URL when filters change
  useEffect(() => {
    if (!isMounted) return;

    const params = new URLSearchParams();

    if (selectedDateRange?.startDate && selectedDateRange?.endDate) {
      const formattedStartDate = formatDate(selectedDateRange.startDate);
      const formattedEndDate = formatDate(selectedDateRange.endDate);
      if (formattedStartDate && formattedEndDate) {
        params.set("startDate", formattedStartDate);
        params.set("endDate", formattedEndDate);
      }
    }
    if (selectedAge) params.set("age", selectedAge);
    if (selectedGender) params.set("gender", selectedGender);

    const newUrl = `${window.location.origin}/?${params.toString()}`;
    setUrl(newUrl);

    router.push(`/?${params.toString()}`, { scroll: false });
  }, [selectedDateRange, selectedAge, selectedGender, router, isMounted]);

  const handleBarClick = (index) => {
    setSelectedIndex(index);
  };

  const copyToClipboard = async () => {
    if (!isMounted) return;
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    try {
      
      await navigator.clipboard.writeText(url);
      
      alert("URL copied to clipboard!");
    } catch (err) {
      fallbackCopyTextToClipboard(url);
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
    if (!isMounted) return;

    const textField = document.createElement("textarea");
    textField.value = text;
    textField.style.position = "fixed";
    textField.style.opacity = 0;
    document.body.appendChild(textField);
    textField.focus();
    textField.select();

    try {
      document.execCommand("copy");
      alert("URL copied to clipboard!");
    } catch (err) {
      console.error("Fallback: Failed to copy text", err);
    } finally {
      document.body.removeChild(textField);
    }
  };

  const handleShare = async () => {
    if (!isMounted) return;
    const shareData = {
      title: `${user}'s dashboard`,
      text: `${user}'s dashboard`,
      url: url,
    };

    try {
      if (navigator.share) {
        if (navigator.vibrate) {
          navigator.vibrate(200);
        }
        await navigator.share(shareData);

        console.log("Shared successfully");
      } else {
        alert("Web Share API is not supported in your browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Suspense
      fallback={
        <div className="flex flex-row min-h-screen px-4 justify-center items-center"><p>🚀 Sky is not the limit, your mind is !</p></div>
      }>
      <div className='flex flex-col'>
        <div className='py-6 gap-y-4'>
          <Filter
            value={selectedDateRange}
            handleValueChange={handleValueChange}
            selectedAge={selectedAge}
            setSelectedAge={setSelectedAge}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
          />
        </div>

        <div className='flex flex-col md:flex-row justify-evenly gap-6 md:gap-2 m-0 p-2 md:mx-8 md:p-8 '>
          <div className='w-full h-[200%] chart-container lg:h-full items-center justify-center'>
            <BarChart onBarClick={handleBarClick} barData={filteredData} />
          </div>

          <div className='w-full chart-container h-full'>
            {selectedIndex !== null && (
              <LineChart
                lineData={filteredData}
                selectedIndex={selectedIndex}
              />
            )}
          </div>
        </div>

        <div className='flex flex-col px-4 pt-2 pb-4 items-center'>
          <p className='my-4'>
            <span className='bg-green-200 rounded-full max-h-[35px] px-4 py-1 items-center flex gap-2  text-green-800'>
              <span className='text-green-500 animate-ping  font-bold text-2xl'>
                &#8226;
              </span>
              {user}
            </span>
          </p>
          <div className='flex flex-col md:flex-row gap-4'>
            <input
              type='text'
              value={url}
              readOnly
              className='w-full max-h-[40px] max-w-md p-2 mt-2 border text-black border-gray-300 rounded'
            />
            <div className='flex justify-center gap-2'>
              <button
              style={{
                backgroundImage: 'linear-gradient(30deg, #060031FF 0%, #71C4FFFF 100%)',
              }}
                onClick={copyToClipboard}
                className='mt-2 flex gap-2 text-sm px-4 items-center justify-center max-h-[40px] flex-grow-0 py-2 rounded-full transform transition duration-300 hover:scale-105 text-white'>
               <Copy size={16} className=""/> Copy
              </button>
              <button
              style={{
                backgroundImage: 'linear-gradient(30deg, #060031FF 0%, #71C4FFFF 100%)',
              }}
                onClick={handleShare}
                className='mt-2 px-4 flex text-sm gap-2 items-center justify-center max-h-[40px] flex-grow-0 py-2 transform transition duration-300 hover:scale-105 rounded-full text-white'>
               <SquareArrowOutUpRight size={16}/> Share
              </button>
              <button
                className='px-4 flex gap-2 items-center justify-center text-sm py-2 mt-2 max-h-[40px] rounded-full transform transition duration-300 hover:scale-105 bg-red-600 text-white'
                onClick={logout}>
                <UserRoundMinus size={16}/> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Dashboard;
