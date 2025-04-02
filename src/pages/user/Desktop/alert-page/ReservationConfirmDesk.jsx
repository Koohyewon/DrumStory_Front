import React from "react";
import { useNavigate } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

export default function ReservationConfirmDesk() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-white px-8 pt-8 pb-20">
        <button
          onClick={() => navigate(-1)}
          className="self-start p-2 cursor-pointer">
          <IoIosArrowBack className="text-gray-700" size={50} />
        </button>
        <div className="flex-grow flex flex-col items-center justify-center font-bold text-gray-800">
          <p className="mb-15 text-2xl">노주희 님의 예약 정보</p>
          <div className="border-3 px-15 py-12 text-center rounded-xl">
            <p className="text-xl">
              <span className="mr-7 text-2xl">1번 방</span>
              2025.02.20(목) 오후 4:00 ~ 오후 5:00
            </p>
          </div>
        </div>
        <button
          className="cursor-pointer bg-[#44A4FA] text-white h-14 w-65 py-2 px-6 rounded-lg text-xl font-bold"
          onClick={() => alert("확인 버튼 클릭됨")}>
          예약 취소
        </button>
      </div>
    </>
  );
}
