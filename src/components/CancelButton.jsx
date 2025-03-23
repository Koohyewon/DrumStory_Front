import React from "react";
import { Link } from "react-router-dom";

export default function CancelButton({ link }) {
  return (
    <Link to={link}>
      <button className="cursor-pointer h-12 w-50 bg-[#DCDCDC] rounded-lg">
        취소
      </button>
    </Link>
  );
}
