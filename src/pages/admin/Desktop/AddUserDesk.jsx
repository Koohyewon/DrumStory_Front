import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../../../components/InputField";
import CancelButton from "../../../components/CancelButton";
import ActionButton from "../../../components/ActionButton";
import axios from "../../../api/axiosInstance";

export default function AddUserDesk() {
  const navigate = useNavigate();
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

  const addUser = async () => {
    if (
      !addUserForm.userName ||
      !addUserForm.userPhone ||
      !addUserForm.userId
    ) {
      return;
    }

    const data = {
      name: addUserForm.userName,
      phoneNumber: addUserForm.userPhone,
      memberNum: addUserForm.userId,
    };

    try {
      await axios.post("/admin/member/add", data);
      navigate("/admin/user-management");
    } catch (error) {
      console.error(error);
      if (error.status == 409) {
        alert("이미 존재하는 회원번호입니다.");
      }
    }
  };

  // 모든 입력 필드가 채워져 있는지 확인
  const isFormValid =
    addUserForm.userName && addUserForm.userPhone && addUserForm.userId;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <div className="text-center py-7.5 text-[35px] font-bold border-b border-gray-300 w-full">
        회원 추가
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        {/* 입력 폼 */}
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

        <div className="flex justify-between mt-20 font-bold">
          {/* 취소 버튼 */}
          <CancelButton link="/admin/user-management" />

          {/* 추가 버튼 (비활성화 처리) */}
          <div className="ml-10">
            <ActionButton
              text="추가"
              onClick={addUser}
              disabled={!isFormValid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
