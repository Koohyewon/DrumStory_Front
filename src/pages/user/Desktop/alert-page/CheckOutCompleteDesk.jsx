import React from "react";
import { useNavigate } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

export default function CheckOutCompleteDesk() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-white px-8 pt-8 pb-20">
        <button
          onClick={() => navigate(-1)}
          className="self-start p-2 cursor-pointer">
          <IoIosArrowBack className="text-gray-700" size={50} />
        </button>
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-gray-800">
            노주희 님 퇴실 완료 되었습니다
          </p>
        </div>
        <button
          className="cursor-pointer bg-[#44A4FA] text-white h-14 w-65 py-2 px-6 rounded-lg text-xl font-bold"
          onClick={() => alert("확인 버튼 클릭됨")}>
          확인
        </button>
      </div>
    </>
  );
}
