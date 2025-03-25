import { useState } from "react";

import InputField from "../../../components/InputField";
import CancelButton from "../../../components/CancelButton";
import ActionButton from "../../../components/ActionButton";

export default function ChangeAdminInfoDesk() {
  const [form, setForm] = useState({
    existingId: "",
    newId: "",
    adminName: "",
    adminPhone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleActionClick = () => {
    console.log(form);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* 헤더 */}
        <div className="text-center py-7.5 text-[35px] font-bold border-b border-gray-300 w-full">
          관리자 정보 변경
        </div>

        <div className="my-15 flex flex-col items-center justify-center flex-grow">
          {/* 입력 폼 */}
          <>
            <InputField
              label="기존 ID"
              name="existingId"
              placeholder="0000"
              value={form.existingId}
              onChange={handleChange}
            />

            <InputField
              label="새로운 ID"
              name="newId"
              placeholder="0000"
              value={form.newId}
              onChange={handleChange}
            />

            <InputField
              label="이름"
              name="adminName"
              placeholder="홍길동"
              value={form.adminName}
              onChange={handleChange}
            />

            <InputField
              label="전화번호"
              name="adminPhone"
              placeholder="01012345678"
              value={form.adminPhone}
              onChange={handleChange}
            />
          </>

          <div className="flex justify-between mt-20 font-bold">
            {/* 취소 버튼 */}
            <CancelButton link="/admin/admin-main" />

            {/* 설정 버튼 */}
            <div className="ml-10">
              <ActionButton text="설정" onClick={handleActionClick} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
