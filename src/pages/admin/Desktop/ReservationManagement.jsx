import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import axios from "../../../api/axiosInstance";

export default function ReservationManagement() {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservationData, setReservationData] = useState([]);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  const rooms = [1, 2, 3, 4, 5];

  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    timeSlots.push({ hour, minute: 0 });
    timeSlots.push({ hour, minute: 30 });
  }

  useEffect(() => {
    const memberReservation = async () => {
      try {
        const data = { resDate: selectedDate };
        const response = await axios.post("/admin/reservation", data);
        setReservationData(response.data); // 예약 데이터 저장
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedDate) memberReservation();
  }, [selectedDate]);

  useEffect(() => {
    const dates = [];
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);

      const formatted = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

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

  const formatMonthYear = () => {
    if (weekDates.length === 0) return "";
    const date = weekDates[0].fullDate;
    return `${date.getFullYear()}.${date.getMonth() + 1}`;
  };

  //예약 여부 확인 함수
  const isSlotBooked = (room, hour, minute) => {
    const timeStr = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
    return reservationData.find(
      (item) => item.roomNum === `${room}번 방` && item.time === timeStr
    );
  };

  const handleBookedSlotClick = (id) => {
    console.log("예약 ID:", id);
    setSelectedReservationId(id);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-4 text-2xl font-bold">
        <button onClick={() => navigate("/admin")}>
          <IoIosArrowBack size={38} />
        </button>
        <div className="mr-8">{formatMonthYear()}</div>
        <div></div>
      </div>

      {/* 요일 선택 */}
      <div className="grid grid-cols-7 text-center border-b border-gray-200 py-4">
        {weekDates.map((dateObj, index) => (
          <div key={`day-${index}`} className="py-2 text-xs font-bold">
            {dateObj.day}
          </div>
        ))}
        {weekDates.map((dateObj, index) => (
          <div
            key={`date-${index}`}
            className="relative py-4 cursor-pointer"
            onClick={() => setSelectedDate(dateObj.formattedDate)}>
            {dateObj.formattedDate === selectedDate && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#44A4FA] rounded-full"></div>
            )}
            <div
              className={`relative z-10 ${
                dateObj.formattedDate === selectedDate
                  ? "text-white"
                  : "text-black"
              } text-xl font-bold`}>
              {dateObj.date}
            </div>
          </div>
        ))}
      </div>

      {/* 스케줄표 */}
      <div className="flex-1 overflow-y-auto mt-6 px-4 pb-20">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="bg-gray-100">
              <th className="border-2 border-[#DDDDDD] py-6 w-24"></th>
              {rooms.map((room) => (
                <th
                  key={room}
                  className="border-2 border-[#DDDDDD] text-center py-2 w-1/6">
                  {room}번 방
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(({ hour, minute }) => (
              <tr key={`${hour}-${minute}`}>
                <td className="border-2 border-[#DDDDDD] text-[#747474] text-center font-bold py-2">
                  {`${String(hour).padStart(2, "0")}:${String(minute).padStart(
                    2,
                    "0"
                  )}`}
                </td>
                {rooms.map((room) => {
                  const bookedSlot = isSlotBooked(room, hour, minute);
                  const isSelected =
                    bookedSlot && bookedSlot.id === selectedReservationId;

                  return (
                    <td
                      key={`${room}-${hour}-${minute}`}
                      className={`border-2 border-[#DDDDDD] p-2 cursor-pointer ${
                        isSelected
                          ? "bg-[#FC7B7B] text-white"
                          : bookedSlot
                          ? "bg-[#FDECEC]"
                          : "bg-white"
                      }`}
                      onClick={() =>
                        bookedSlot && handleBookedSlotClick(bookedSlot.id)
                      }>
                      {bookedSlot && (
                        <div className="text-sm font-bold text-center">
                          {bookedSlot.name}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
