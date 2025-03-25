import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";

import AdminIdInputModal from "./../../../components/AdminIdInputModal";

export default function MainDesk() {
  const [isAdmin, setIsAdmin] = useState(false);
  const handleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <>
      <div>
        {/* 헤더 */}
        <div className="flex items-center justify-between px-9 py-7 border-b-1 border-gray-300">
          <span className="font-bold text-3xl">드럼스토리</span>

          <IoMdSettings
            className="cursor-pointer"
            size={35}
            onClick={handleAdminMode}
          />
        </div>

        {isAdmin && <AdminIdInputModal />}
      </div>
    </>
  );
}
