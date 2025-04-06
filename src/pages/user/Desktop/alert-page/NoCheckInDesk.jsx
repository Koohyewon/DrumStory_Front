import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function NoCheckInDesk() {
  const navigate = useNavigate();
  const location = useLocation();
  const memberData = location.state?.memberData; // Fallback if no data

  const handleConfirm = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log(memberData);
  }, [memberData]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-white px-8 pt-8 pb-20">
        <button
          onClick={() => navigate("/")}
          className="self-start p-2 cursor-pointer">
          <IoIosArrowBack className="text-gray-700" size={50} />
        </button>
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-gray-800">
            {memberData?.name || "회원"} 님 입실 내역이 없습니다
          </p>
        </div>
        <button
          className="cursor-pointer bg-[#44A4FA] text-white h-14 w-65 py-2 px-6 rounded-lg text-xl font-bold"
          onClick={handleConfirm}>
          확인
        </button>
      </div>
    </>
  );
}
