import React from "react";

export default function ActionButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer h-12 w-50 bg-[#1A66CC] text-white rounded-lg">
      {text}
    </button>
  );
}
