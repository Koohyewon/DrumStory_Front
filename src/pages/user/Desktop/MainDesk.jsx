import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import AdminIdInputModal from "./../../../components/AdminIdInputModal";

export default function MainDesk() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [currentDate] = useState(new Date("2025-02-20"));

  // 예약된 셀 예시 데이터 - 실제 구현에서는 DB에서 가져올 것
  const bookedSlots = [
    { room: 1, hour: 9, minute: 0, day: 1 },
    { room: 1, hour: 13, minute: 30, day: 1 },
    { room: 2, hour: 14, minute: 30, day: 2 },
    { room: 3, hour: 9, minute: 0, day: 3 },
    { room: 4, hour: 11, minute: 30, day: 4 },
    { room: 1, hour: 9, minute: 30, day: 3 },
  ];

  const handleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  const handleSlotClick = (room, hour, minute, day) => {
    const slotKey = `${room}-${hour}-${minute}-${day}`;
    if (selectedSlots.includes(slotKey)) {
      setSelectedSlots(selectedSlots.filter((slot) => slot !== slotKey));
    } else {
      setSelectedSlots([...selectedSlots, slotKey]);
    }
  };

  const isBooked = (room, hour, minute, day) => {
    return bookedSlots.some(
      (slot) =>
        slot.room === room &&
        slot.hour === hour &&
        slot.minute === minute &&
        slot.day === day
    );
  };

  const isSelected = (room, hour, minute, day) => {
    return selectedSlots.includes(`${room}-${hour}-${minute}-${day}`);
  };

  // 날짜 포맷팅 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];

    return `${year}.${month}.${day} (${dayOfWeek})`;
  };

  // 시간 표시 형식 함수
  const formatTime = (hour, minute) => {
    const period = hour < 12 ? "오전" : "오후";
    const displayHour = hour === 0 || hour === 12 ? 12 : hour % 12;
    return `${period} ${displayHour}:${minute === 0 ? "00" : minute}`;
  };

  // 30분 간격으로 시간 범위 생성 (00:00부터 23:30까지)
  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    timeSlots.push({ hour, minute: 0 });
    timeSlots.push({ hour, minute: 30 });
  }

  // 방 번호 생성
  const rooms = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-9 py-7 border-b border-gray-300">
          <span className="font-bold text-3xl">드럼스토리</span>
          <IoMdSettings
            className="cursor-pointer"
            size={35}
            onClick={handleAdminMode}
          />
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="flex-1 p-6 pb-20 flex flex-col">
          {/* 날짜 표시 */}
          <div className="flex justify-center mt-4 mb-8">
            <div className="text-3xl font-semibold">
              {formatDate(currentDate)}
            </div>
          </div>

          {/* 예약표 */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-white">
                <tr className="bg-gray-100">
                  <th className="border-2 border-[#DDDDDD] py-9 text-center w-28"></th>
                  {rooms.map((room) => (
                    <th
                      key={room}
                      className="border-2 border-[#DDDDDD] p-2 text-center w-1/6">
                      {room}번 방
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(({ hour, minute }, index) => (
                  <tr key={`${hour}-${minute}`}>
                    <td className="border-2 border-[#DDDDDD] text-[#747474] text-center font-bold py-3">
                      {formatTime(hour, minute)}
                    </td>
                    {rooms.map((room) => (
                      <td
                        key={`${room}-${hour}-${minute}`}
                        className={`border-2 border-[#DDDDDD] p-4 cursor-pointer ${
                          isBooked(room, hour, minute, 1)
                            ? "bg-red-100"
                            : isSelected(room, hour, minute, 1)
                            ? "bg-blue-100"
                            : ""
                        }`}
                        onClick={() =>
                          handleSlotClick(room, hour, minute, 1)
                        }></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex gap-12 z-10 font-bold text-lg">
          <button className="bg-[#44A4FA] text-white h-12 w-60 rounded-lg drop-shadow-lg shadow-black">
            예약/취소
          </button>
          <button className="bg-[#FC7B7B] text-white h-12 w-60 rounded-lg drop-shadow-lg">
            퇴실하기
          </button>
        </div>
      </div>

      {isAdmin && <AdminIdInputModal />}
    </>
  );
}
