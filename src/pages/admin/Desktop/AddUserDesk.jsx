import { useState } from "react";

import InputField from "../../../components/InputField";
import CancelButton from "../../../components/CancelButton";
import ActionButton from "../../../components/ActionButton";

export default function AddUserDesk() {
  const [addUserForm, setAddUserForm] = useState({
    userName: "",
    userPhone: "",
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleActionClick = () => {
    console.log(addUserForm);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* 헤더 */}
        <div className="text-center py-5 text-[28px] font-bold border-b border-gray-300 w-full">
          회원 추가
        </div>

        <div className="flex flex-col items-center justify-center flex-grow">
          {/* 입력 폼 */}
          <>
            <InputField
              label="회원 이름"
              name="userName"
              placeholder="홍길동"
              value={addUserForm.userName}
              onChange={handleChange}
            />

            <InputField
              label="회원 전화번호"
              name="userPhone"
              placeholder="01012345678"
              value={addUserForm.userPhone}
              onChange={handleChange}
            />

            <InputField
              label="회원 번호(ID)"
              name="userId"
              placeholder="0000"
              value={addUserForm.userId}
              onChange={handleChange}
            />
          </>

          <div className="flex justify-between mt-20 font-bold">
            {/* 취소 버튼 */}
            <CancelButton link="/admin/user-management" />

            {/* 설정 버튼 */}
            <div className="ml-10">
              <ActionButton text="추가" onClick={handleActionClick} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
