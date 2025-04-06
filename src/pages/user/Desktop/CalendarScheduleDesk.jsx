import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../api/axiosInstance";

const CalendarSchedule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const memberData = location.state?.memberData;

  const [currentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const availableTime = async () => {
      try {
        const data = { resDate: selectedDate };
        const response = await axios.post("/reservation", data);
        setAvailableTimes(response.data.availableTimes); // 받아온 시간대 저장
        console.log(response.data);
      } catch (error) {
        console.error("시간대 불러오기 실패", error);
      }
    };

    if (selectedDate) {
      availableTime();
    }
  }, [selectedDate]);

  useEffect(() => {
    const dates = [];
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);

      const formatted = date.toISOString().split("T")[0];

      dates.push({
        date: date.getDate(),
        day: days[date.getDay()],
        fullDate: date,
        formattedDate: formatted,
      });
    }

    setWeekDates(dates);
    setSelectedDate(dates[0].formattedDate);
  }, [currentDate]);

  const handleTimeSelection = (timeObj) => {
    const clickedId = timeObj.id;

    if (selectedTimes.includes(clickedId)) {
      setSelectedTimes(selectedTimes.filter((id) => id !== clickedId));
      return;
    }

    if (selectedTimes.length >= 2) return;

    if (selectedTimes.length === 1) {
      const existing = selectedTimes[0];
      const diff = Math.abs(existing - clickedId);
      if (diff !== 1) {
        alert("연속된 시간만 선택할 수 있습니다!");
        return;
      }
    }

    setSelectedTimes([...selectedTimes, clickedId]);
  };

  const renderTimeButton = (timeStr) => {
    const timeObj = availableTimes.find((t) => t.timeTable === timeStr);

    const isAvailable = !!timeObj;
    const isSelected = timeObj && selectedTimes.includes(timeObj.id);

    return (
      <button
        key={timeStr}
        disabled={!isAvailable}
        onClick={() => {
          if (isAvailable) handleTimeSelection(timeObj);
        }}
        className={`py-2 rounded border text-center text-sm ${
          isAvailable
            ? isSelected
              ? "bg-blue-900 text-white border-blue-900"
              : "border-gray-200 text-black"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}>
        {timeStr}
      </button>
    );
  };

  const morningTimeRows = [
    ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30"],
    ["04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30"],
    ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
  ];

  const afternoonTimeRows = [
    ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"],
    ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"],
    ["20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
  ];

  const formatMonthYear = () => {
    if (weekDates.length === 0) return "";
    const date = weekDates[0].fullDate;
    return `${date.getFullYear()}.${date.getMonth() + 1}`;
  };

  //선택버튼 클릭시
  const handleSelect = async () => {
    try {
      const data = { resTimeIds: selectedTimes, resDate: selectedDate };
      const response = await axios.post("/reservation/time", data);

      const passData = response.data;

      if (response.status == 200) {
        console.log(passData);
        navigate("/room", {
          state: { passData },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div className="text-lg font-medium">{formatMonthYear()}</div>
        <div className="text-blue-900 font-medium">
          {memberData?.name || "회원"}님
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center border-t border-b border-gray-200">
        {weekDates.map((dateObj, index) => (
          <div key={`day-${index}`} className="py-2 text-xs">
            {dateObj.day}
          </div>
        ))}
        {weekDates.map((dateObj, index) => (
          <div
            key={`date-${index}`}
            className="relative py-4 cursor-pointer"
            onClick={() => setSelectedDate(dateObj.formattedDate)}>
            {dateObj.formattedDate === selectedDate && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-900 rounded-full"></div>
            )}
            <div
              className={`relative z-10 ${
                dateObj.formattedDate === selectedDate
                  ? "text-white"
                  : "text-black"
              } font-medium`}>
              {dateObj.date}
            </div>
          </div>
        ))}
      </div>

      {/* 오전 */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-base">오전</div>
          <div className="text-xs text-gray-500">
            *연속 2타임까지만 예약 가능(최대 1시간)
          </div>
        </div>

        {morningTimeRows.map((row, rowIndex) => (
          <div
            key={`morning-row-${rowIndex}`}
            className="grid grid-cols-8 gap-2 mb-2">
            {row.map((time) => renderTimeButton(time))}
          </div>
        ))}
      </div>

      {/* 오후 */}
      <div className="p-4">
        <div className="text-base mb-2">오후</div>

        {afternoonTimeRows.map((row, rowIndex) => (
          <div
            key={`afternoon-row-${rowIndex}`}
            className="grid grid-cols-8 gap-2 mb-2">
            {row.map((time) => renderTimeButton(time))}
          </div>
        ))}
      </div>

      <div className="p-4 flex justify-center">
        <button
          className="w-full py-3 bg-blue-900 text-white rounded text-lg font-medium"
          onClick={handleSelect}>
          선택
        </button>
      </div>
    </div>
  );
};

export default CalendarSchedule;
