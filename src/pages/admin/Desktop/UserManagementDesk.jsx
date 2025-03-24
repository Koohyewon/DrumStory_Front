import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

export default function UserManagementDesk() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* 헤더 */}
      <div className="relative flex justify-center items-center py-7.5 text-[35px] font-bold border-b border-gray-300 w-full">
        <Link to="/admin/admin-main" className="absolute left-7">
          <IoChevronBack size={45} />
        </Link>

        <span>회원 관리</span>
      </div>

      {/* 회원 검색 */}
      <div className="mt-10 w-full flex justify-end pr-10">
        <div className="bg-[#E6E6E6] h-12 w-[35%] min-w-[350px] flex items-center justify-between px-4 rounded-xl">
          <input
            type="text"
            placeholder="회원 검색"
            className="font-bold text-lg bg-transparent outline-none w-full mr-2 pl-1"
          />
          <IoSearch size={25} />
        </div>
      </div>

      <div className="mt-8">
        {/* 선택된 항목 & 추가수정삭제 버튼 */}
        <div className="px-10 w-screen flex justify-between items-center font-bold">
          <div>n개 항목</div>
          <div>
            <button
              className="cursor-pointer bg-[#44A4FA] text-white h-7.5 w-19 rounded-lg"
              onClick={() => {
                navigate("/admin/add-user");
              }}>
              추가
            </button>

            <button className="cursor-pointer bg-[#D9D9D9] text-[#575454] h-7.5 w-19 rounded-lg mx-4">
              수정
            </button>

            <button className="cursor-pointer bg-[#FC7B7B] text-white h-7.5 w-19 rounded-lg">
              삭제
            </button>
          </div>
        </div>

        {/* 회원 정보 */}
      </div>
    </div>
  );
}
