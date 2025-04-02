import React, { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AdminIdInputModal() {
  const [adminId, setAdminId] = useState(""); // 입력된 adminId를 상태로 관리
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", { memberNum: adminId });
      const Token = response.data.accessToken;
      const Role = response.data.role;

      localStorage.setItem("Token", Token);
      localStorage.setItem("Role", Role);

      navigate("/admin/admin-main");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black/30 bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white rounded-lg p-6 shadow-lg z-10 w-80">
        <div className="text-center mb-4">
          <p className="font-bold text-lg">관리자 ID를 입력해주세요</p>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={adminId} // 입력된 값은 상태 값으로 바인딩
            onChange={(e) => setAdminId(e.target.value)} // 입력값을 상태에 저장
            className="w-full p-2 bg-blue-100 rounded border border-gray-200"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="cursor-pointer bg-[#44A4FA] text-white py-1 px-4 rounded"
            onClick={handleLogin}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
