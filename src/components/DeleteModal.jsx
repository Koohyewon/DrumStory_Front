import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/[.35] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-96">
        <h2 className="text-xl font-bold mb-4">회원 삭제</h2>
        <p className="mb-6">
          정말 <span className="font-bold">{userName}</span> 회원을
          삭제하시겠습니까?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#FC7B7B] text-white rounded-lg hover:bg-red-600">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
