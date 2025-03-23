import React from "react";

export default function AdminIdInputModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white rounded-lg p-6 shadow-lg z-10 w-80">
        <div className="text-center mb-4">
          <p className="font-bold text-lg">관리자 ID를 입력해주세요</p>
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 bg-blue-100 rounded border border-gray-200"
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-gray-400 text-white py-1 px-4 rounded">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
