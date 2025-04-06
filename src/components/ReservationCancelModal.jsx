import React from "react";

const ReservationCancelModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/[.35] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-96 font-bold">
        <p className="text-center py-8 text-lg">예약을 취소하시겠습니까?</p>
        <div className="flex justify-center space-x-15">
          <button
            onClick={onClose}
            className="px-6 py-1 bg-gray-300 rounded-lg hover:bg-gray-400">
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-1 bg-[#FC7B7B] text-white rounded-lg hover:bg-red-600">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCancelModal;
