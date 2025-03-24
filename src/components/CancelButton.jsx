import React from "react";
import { Link } from "react-router-dom";

export default function CancelButton({ link }) {
  return (
    <Link to={link}>
      <button className="cursor-pointer h-15 w-55 bg-[#DCDCDC] rounded-lg font-bold text-lg">
        취소
      </button>
    </Link>
  );
}
