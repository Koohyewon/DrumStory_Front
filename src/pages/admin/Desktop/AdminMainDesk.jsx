import React from "react";
import { Link } from "react-router-dom";

export default function AdminMainDesk() {
  return (
    <div className="flex flex-col min-h-screen text-center">
      {/* 헤더 */}
      <div className="py-5 text-[28px] font-bold border-b border-gray-300 w-full">
        관리자 페이지
      </div>

      {/* 페이지 이동 버튼 */}
      <div className="flex flex-col items-center justify-center flex-grow">
        {/* <Link
          to="/admin/user-management"
          className="cursor-pointer h-18 w-2/5 max-w-[550px] px-4 py-2 mb-10 bg-[#D9D9D9] rounded-md font-bold flex items-center justify-center">
          회원 관리
        </Link> */}

        <Link
          to="/admin/add-user"
          className="cursor-pointer h-18 w-2/5 max-w-[550px] px-4 py-2 mb-10 bg-[#D9D9D9] rounded-md font-bold flex items-center justify-center">
          회원 관리
        </Link>

        <Link
          to="/admin/reservation-management"
          className="cursor-pointer h-18 w-2/5 max-w-[550px] px-4 py-2 bg-[#D9D9D9] rounded-md font-bold flex items-center justify-center">
          예약 관리
        </Link>

        <Link
          to="/admin/change-admin-info"
          className="cursor-pointer mt-34 text-sm text-gray-600 font-bold border-b">
          관리자 정보 변경
        </Link>
      </div>
    </div>
  );
}
