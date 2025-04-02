import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import InputField from "../../../components/InputField";
import CancelButton from "../../../components/CancelButton";
import ActionButton from "../../../components/ActionButton";
import axios from "../../../api/axiosInstance";

export default function EditUserDesk() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.user;

  const [editUserForm, setEditUserForm] = useState({
    userName: "",
    userPhone: "",
    userId: "",
    beforeUserId: "",
  });

  useEffect(() => {
    if (userData) {
      setEditUserForm({
        userName: userData.name || "",
        userPhone: userData.phoneNumber || "",
        userId: userData.memberNum || "",
        beforeUserId: userData.memberNum || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editUser = async () => {
    if (
      !editUserForm.userName ||
      !editUserForm.userPhone ||
      !editUserForm.userId
    ) {
      return;
    }

    const data = {
      name: editUserForm.userName,
      phoneNumber: editUserForm.userPhone,
      memberNum: editUserForm.userId,
      oldMemberNum: editUserForm.beforeUserId,
    };

    try {
      await axios.put("/admin/member/update", data);
      navigate("/admin/user-management");
    } catch (error) {
      console.log(error);
      if (error.status == 409) {
        alert("이미 존재하는 회원번호입니다.");
      }
    }
  };

  // 모든 입력 필드가 채워져 있는지 확인
  const isFormValid =
    editUserForm.userName && editUserForm.userPhone && editUserForm.userId;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <div className="text-center py-7.5 text-[35px] font-bold border-b border-gray-300 w-full">
        회원 수정
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        {/* 입력 폼 */}
        <InputField
          label="회원 이름"
          name="userName"
          placeholder="홍길동"
          value={editUserForm.userName}
          onChange={handleChange}
        />

        <InputField
          label="회원 전화번호"
          name="userPhone"
          placeholder="01012345678"
          value={editUserForm.userPhone}
          onChange={handleChange}
        />

        <InputField
          label="회원 번호(ID)"
          name="userId"
          placeholder="0000"
          value={editUserForm.userId}
          onChange={handleChange}
        />

        <div className="flex justify-between mt-20 font-bold">
          {/* 취소 버튼 */}
          <CancelButton link="/admin/user-management" />

          {/* 수정 버튼 (비활성화 처리) */}
          <div className="ml-10">
            <ActionButton
              text="수정"
              onClick={editUser}
              disabled={!isFormValid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
