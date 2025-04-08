import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../../api/axiosInstance";

import { IoIosArrowBack } from "react-icons/io";

export default function CheckOutCompleteDesk() {
  const navigate = useNavigate();
  const location = useLocation();

  const memberData = location.state?.memberData;

  const handleConfirm = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const deleteRes = async () => {
      try {
        const response = await axios.delete("/reservation/delete");
        // console.log(response.status);
      } catch (error) {
        console.error(error);
      }
    };
    deleteRes();
  }, [memberData]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-white px-8 pt-8 pb-20">
        <button
          onClick={() => navigate("/", { replace: true })}
          className="self-start p-2 cursor-pointer">
          <IoIosArrowBack className="text-gray-700" size={50} />
        </button>
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-gray-800">
            {memberData?.name || memberData.reservationInfo.name} 님 퇴실 완료
            되었습니다
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
