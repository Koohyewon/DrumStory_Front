import React from "react";

export default function ActionButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer h-15 w-55 bg-[#44A4FA] font-bold text-lg text-white rounded-lg">
      {text}
    </button>
  );
}
