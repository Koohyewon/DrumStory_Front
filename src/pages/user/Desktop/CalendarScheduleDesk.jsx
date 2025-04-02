import React, { useState, useEffect } from "react";

const CalendarSchedule = () => {
  // Get current date and calculate week dates
  const [currentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState(["4:00", "4:30"]);

  useEffect(() => {
    // Generate 7 days starting from today
    const dates = [];
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);

      dates.push({
        date: date.getDate(),
        day: days[date.getDay()],
        fullDate: date,
      });
    }

    setWeekDates(dates);
    // Set first day as selected by default
    setSelectedDate(dates[0].date);
  }, [currentDate]);

  const handleTimeSelection = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  // Morning time slots arranged in 3 rows of 8
  const morningTimeRows = [
    ["00:00", "00:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30"],
    ["4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30"],
    ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30"],
  ];

  // Afternoon time slots arranged in 3 rows of 8
  const afternoonTimeRows = [
    ["12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30"],
    ["4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30"],
    ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30"],
  ];

  // Format date for display
  const formatMonthYear = () => {
    if (weekDates.length === 0) return "";
    const date = weekDates[0].fullDate;
    return `${date.getFullYear()}.${date.getMonth() + 1}`;
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
        <div className="text-blue-900 font-medium">노주휘님</div>
      </div>

      {/* Days of the week and dates */}
      <div className="grid grid-cols-7 text-center border-t border-b border-gray-200">
        {/* Days of week */}
        {weekDates.map((dateObj, index) => (
          <div key={`day-${index}`} className="py-2 text-xs">
            {dateObj.day}
          </div>
        ))}

        {/* Dates */}
        {weekDates.map((dateObj, index) => (
          <div
            key={`date-${index}`}
            className="relative py-4 cursor-pointer"
            onClick={() => setSelectedDate(dateObj.date)}>
            {dateObj.date === selectedDate ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-900 rounded-full"></div>
            ) : null}
            <div
              className={`relative z-10 ${
                dateObj.date === selectedDate ? "text-white" : "text-black"
              } font-medium`}>
              {dateObj.date}
            </div>
          </div>
        ))}
      </div>

      {/* Morning time selection */}
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
            {row.map((time, colIndex) => (
              <button
                key={`morning-${rowIndex}-${colIndex}`}
                className="py-2 rounded border border-gray-200 text-center text-sm">
                {time}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Afternoon time selection */}
      <div className="p-4">
        <div className="text-base mb-2">오후</div>

        {afternoonTimeRows.map((row, rowIndex) => (
          <div
            key={`afternoon-row-${rowIndex}`}
            className="grid grid-cols-8 gap-2 mb-2">
            {row.map((time, colIndex) => {
              const isSelected = selectedTimes.includes(time);
              return (
                <button
                  key={`afternoon-${rowIndex}-${colIndex}`}
                  className={`py-2 rounded border text-center text-sm ${
                    isSelected
                      ? "bg-blue-900 text-white border-blue-900"
                      : "border-gray-200 text-black"
                  }`}
                  onClick={() => handleTimeSelection(time)}>
                  {time}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Submit button */}
      <div className="p-4 flex justify-center">
        <button className="w-full py-3 bg-blue-900 text-white rounded text-lg font-medium">
          선택
        </button>
      </div>
    </div>
  );
};

export default CalendarSchedule;
