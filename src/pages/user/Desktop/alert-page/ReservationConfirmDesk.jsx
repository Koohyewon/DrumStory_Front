import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";
import ReservationCancelModal from "../../../../components/ReservationCancelModal";
import axios from "../../../../api/axiosInstance";

export default function ReservationConfirmDesk() {
  const navigate = useNavigate();
  const location = useLocation();
  const memberData = location.state?.memberData;

  const [showCancelModal, setShowCancelModal] = useState(false);

  const formatDateWithDay = (dateStr) => {
    const date = new Date(dateStr);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const formattedDate = dateStr.replaceAll("-", ".");
    const day = days[date.getDay()];
    return `${formattedDate}(${day})`;
  };

  const handleDeleteRes = async () => {
    try {
      const response = await axios.delete("/reservation/delete");
      console.log(response.status);
      if (response.status == 204) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-white px-8 pt-8 pb-20">
        <button
          onClick={() => navigate("/", { replace: true })}
          className="self-start p-2 cursor-pointer">
          <IoIosArrowBack className="text-gray-700" size={50} />
        </button>
        <div className="flex-grow flex flex-col items-center justify-center font-bold text-gray-800">
          <p className="mb-15 text-2xl">
            {memberData.name || memberData.reservationInfo.name} 님의 예약 정보
          </p>
          <div className="border-3 px-15 py-12 text-center rounded-xl">
            <p className="text-xl">
              <span className="mr-7 text-2xl">
                {memberData.reservationInfo.roomNum}
              </span>
              {formatDateWithDay(memberData.reservationInfo.resDate)}{" "}
              {memberData.reservationInfo.startTime} ~{" "}
              {memberData.reservationInfo.endTime}
            </p>
          </div>
        </div>
        <button
          className="cursor-pointer bg-[#44A4FA] text-white h-14 w-65 py-2 px-6 rounded-lg text-xl font-bold"
          onClick={() => setShowCancelModal(true)}>
          예약 취소
        </button>
      </div>

      <ReservationCancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleDeleteRes}
        userName={memberData.name}
      />
    </>
  );
}
