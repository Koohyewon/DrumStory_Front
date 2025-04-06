import React, { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import AdminIdInputModal from "./../../../components/AdminIdInputModal";
import MemberIdInputModal from "./../../../components/MemberIdInputModal";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axiosInstance";

export default function MainDesk() {
  const navigate = useNavigate();

  // 상태 정의
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [currentDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [modalPurpose, setModalPurpose] = useState("");

  //예약 데이터
  const [bookedSlots, setBookedSlots] = useState([]);

  const rooms = [1, 2, 3, 4, 5];

  // 00:00 ~ 23:30까지 30분 간격 시간 슬롯 생성
  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    timeSlots.push({ hour, minute: 0 });
    timeSlots.push({ hour, minute: 30 });
  }

  // 날짜 포맷 (2025.02.20 (화))
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${year}.${month}.${day} (${dayOfWeek})`;
  };

  // 날짜 포맷 함수
  const getDisplayDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${year}.${month}.${day} (${dayOfWeek})`;
  };

  const getRequestDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 시간 포맷 (00:00)
  const formatTime = (hour, minute) => {
    const h = String(hour).padStart(2, "0");
    const m = String(minute).padStart(2, "0");
    return `${h}:${m}`;
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

  const handleSlotClick = (room, hour, minute, day) => {
    const key = `${room}-${hour}-${minute}-${day}`;
    setSelectedSlots((prev) =>
      prev.includes(key) ? prev.filter((slot) => slot !== key) : [...prev, key]
    );
  };

  const handleAdminMode = () => setIsAdmin(true);
  const closeAdminModal = () => setIsAdmin(false);

  const handleReservationClick = () => {
    setModalPurpose("reservation");
    setShowMemberModal(true);
  };

  const handleCheckoutClick = () => {
    setModalPurpose("checkout");
    setShowMemberModal(true);
  };

  const handleAfterLogin = (memberId, hasReservation, memberData) => {
    setShowMemberModal(false);
    if (modalPurpose === "reservation") {
      navigate(hasReservation ? "/reservation" : "/timetable", {
        state: { memberData },
      });
    } else if (modalPurpose === "checkout") {
      navigate(hasReservation ? "/checkout" : "/no-checkin", {
        state: { memberData },
      });
    }
  };

  const extractRoomNumber = (roomStr) => {
    const match = roomStr.match(/\d+/);
    return match ? parseInt(match[0]) : null;
  };

  const extractTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":").map(Number);
    return { hour, minute };
  };

  useEffect(() => {
    const display = getDisplayDate(currentDate);
    const request = getRequestDate(currentDate);

    setDisplayDate(display);
    setRequestDate(request);

    const todayRes = async () => {
      try {
        const response = await axios.get(`/todayReservation/${request}`);
        const data = response.data;

        const mappedSlots = data.map((item) => {
          const { hour, minute } = extractTime(item.time);
          const room = extractRoomNumber(item.roomNum);
          return { room, hour, minute, day: 1 };
        });

        setBookedSlots(mappedSlots);
      } catch (error) {
        console.error("예약 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    todayRes();
  }, [currentDate]);

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

        {/* 메인 */}
        <div className="flex-1 pt-6 px-13 pb-20 flex flex-col">
          {/* 날짜 */}
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
                  <th className="border-2 border-[#DDDDDD] py-9 w-28"></th>
                  {rooms.map((room) => (
                    <th
                      key={room}
                      className="border-2 border-[#DDDDDD] text-center p-2 w-1/6">
                      {room}번 방
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(({ hour, minute }) => (
                  <tr key={`${hour}-${minute}`}>
                    <td className="border-2 border-[#DDDDDD] text-[#747474] text-center font-bold py-3">
                      {formatTime(hour, minute)}
                    </td>
                    {rooms.map((room) => (
                      <td
                        key={`${room}-${hour}-${minute}`}
                        className={`border-2 border-[#DDDDDD] p-4 cursor-pointer ${
                          isBooked(room, hour, minute, 1) && "bg-red-100"
                        }`}
                        onClick={() => handleSlotClick(room, hour, minute, 1)}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex gap-12 z-10 font-bold text-lg">
          <button
            className="bg-[#44A4FA] text-white h-12 w-60 rounded-lg drop-shadow-lg"
            onClick={handleReservationClick}>
            예약/취소
          </button>
          <button
            className="bg-[#FC7B7B] text-white h-12 w-60 rounded-lg drop-shadow-lg"
            onClick={handleCheckoutClick}>
            퇴실하기
          </button>
        </div>
      </div>

      {isAdmin && <AdminIdInputModal onClose={closeAdminModal} />}

      {showMemberModal && (
        <MemberIdInputModal
          onSuccess={handleAfterLogin}
          onClose={() => setShowMemberModal(false)}
          purpose={modalPurpose}
        />
      )}
    </>
  );
}
