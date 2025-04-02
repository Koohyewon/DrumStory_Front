import React from "react";
import { useNavigate } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

export default function ReservationSuccessDesk() {
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
          <p className="mb-25 text-2xl text-[#44A4FA]">
            노주희님 예약이 완료되었습니다
          </p>

          <p className="text-xl mb-5">예약 정보</p>

          <p className="text-lg">
            <span className="mr-7 text-xl">1번 방</span>
            2025.02.20(목) 오후 4:00 ~ 오후 5:00
          </p>

          <p className="mt-20 bg-[#D9D9D9]/[.45] min-w-[500px] px-13 py-6 text-center rounded-lg text-md">
            🔔 이용 종료 5분 전에 알림 문자가 발송됩니다. <br />
            이용 시간에 맞춰 퇴실 부탁드립니다.
          </p>
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
