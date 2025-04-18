import React, { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AdminIdInputModal({ onClose }) {
  const [adminId, setAdminId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!adminId.trim()) {
      setError("관리자 ID를 입력해주세요");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/login", { memberNum: adminId });
      const token = response.data.accessToken;
      const role = response.data.role;

      localStorage.setItem("Token", token);
      localStorage.setItem("Role", role);

      if (role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        setError("관리자 권한이 없습니다");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "로그인에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-black/30 bg-opacity-50 absolute inset-0"
        onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 shadow-lg z-10 w-80">
        <div className="text-center mb-4">
          <p className="font-bold text-lg">관리자 모드</p>
          <p className="text-sm text-gray-600 mt-1">관리자 ID를 입력해주세요</p>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="w-full p-2 bg-blue-100 rounded border border-gray-200"
            placeholder="관리자 ID 입력"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className="flex justify-between">
          <button
            className="cursor-pointer bg-gray-300 text-gray-700 py-2 px-4 rounded"
            onClick={onClose}
            disabled={loading}>
            취소
          </button>
          <button
            className="cursor-pointer bg-[#44A4FA] text-white py-2 px-4 rounded"
            onClick={handleLogin}
            disabled={loading}>
            {loading ? "처리 중..." : "확인"}
          </button>
        </div>
      </div>
    </div>
  );
}
