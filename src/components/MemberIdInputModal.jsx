import React, { useState } from "react";
import axios from "../api/axiosInstance";

export default function MemberIdInputModal({ onSuccess, onClose, purpose }) {
  const [memberId, setMemberId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!memberId.trim()) {
      setError("회원 ID를 입력해주세요");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/login", { memberNum: memberId });
      const token = response.data.accessToken;
      const role = response.data.role;

      const memberData = {
        id: memberId,
        name: response.data.name,
        reservationInfo: response.data.reservationInfo,
      };
      // console.log(memberData);
      // 토큰 및 역할 저장
      localStorage.setItem("Token", token);
      localStorage.setItem("Role", role);

      // 로그인 성공 후 상위 컴포넌트에 알림 (예약 여부와 회원 데이터 전달)
      onSuccess(memberId, response.data.reservationInfo !== null, memberData);

      // console.log(response.data);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "로그인에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  // 모달 타이틀 결정
  const getModalTitle = () => {
    return purpose === "reservation" ? "예약/취소하기" : "퇴실하기";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-black/30 bg-opacity-50 absolute inset-0"
        onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 shadow-lg z-10 w-80">
        <div className="text-center mb-4">
          <p className="font-bold text-lg">{getModalTitle()}</p>
          <p className="text-sm text-gray-600 mt-1">회원 ID를 입력해주세요</p>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="w-full p-2 bg-gray-100 rounded border border-gray-300"
            placeholder="회원 ID 입력"
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
