import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axiosInstance";

import { IoChevronBack, IoSearch } from "react-icons/io5";
import DeleteModal from "../../../components/DeleteModal";

export default function UserManagementDesk() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("/admin/member");

        const Users = response.data.map((user) => ({
          id: user.id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          selected: false,
          memberNum: user.memberNum,
          role: user.role,
        }));

        setUsers(Users);
        // console.log(Users);
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, []);

  const handleSelect = (userId) => {
    const updatedUsers = users.map((user) => ({
      ...user,
      selected: user.id === userId ? !user.selected : false,
    }));

    setUsers(updatedUsers);

    const selected = updatedUsers.find((user) => user.selected);
    setSelectedUser(selected || null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.includes(searchTerm) ||
      user.memberNum.includes(searchTerm) ||
      user.phoneNumber.includes(searchTerm)
  );

  const handleDeleteClick = () => {
    if (!selectedUser) {
      alert("삭제할 회원을 선택해주세요.");
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete("/admin/member/delete", {
        data: { memberNum: selectedUser.memberNum },
      });

      setIsDeleteModalOpen(false);

      // 페이지 새로고침
      window.location.reload();

      alert("회원이 삭제되었습니다.");
    } catch (err) {
      console.error(err);
      alert("회원 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEdit = () => {
    if (!selectedUser) {
      alert("수정할 회원을 선택해주세요.");
      return;
    }

    navigate("/admin/edit-user", {
      state: {
        user: selectedUser,
      },
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="relative flex justify-center items-center py-7.5 text-[35px] font-bold border-b border-gray-300 w-full">
        <Link to="/admin" className="absolute left-7">
          <IoChevronBack size={45} />
        </Link>
        <span>회원 관리</span>
      </div>

      <div className="mt-10 w-full flex justify-end pr-10">
        <div className="bg-[#E6E6E6] h-12 w-[35%] min-w-[350px] flex items-center justify-between px-4 rounded-xl">
          <input
            type="text"
            placeholder="회원 검색"
            className="font-bold text-lg bg-transparent outline-none w-full mr-2 pl-1"
            value={searchTerm}
            onChange={handleSearch}
          />
          <IoSearch size={25} />
        </div>
      </div>

      <div className="mt-8 w-full px-10">
        <div className="w-full flex justify-between items-center font-bold mb-4 px-5">
          <div>{selectedUser ? "1개 항목" : "0개 항목"}</div>
          <div>
            <button
              className="cursor-pointer bg-[#44A4FA] text-white h-7.5 w-19 rounded-lg px-4 py-1"
              onClick={() => navigate("/admin/add-user")}>
              추가
            </button>

            <button
              className="cursor-pointer bg-[#D9D9D9] text-[#575454] h-7.5 w-19 rounded-lg mx-4 px-4 py-1"
              onClick={handleEdit}>
              수정
            </button>

            <button
              className="cursor-pointer bg-[#FC7B7B] text-white h-7.5 w-19 rounded-lg px-4 py-1"
              onClick={handleDeleteClick}>
              삭제
            </button>
          </div>
        </div>

        <div className="w-full border rounded-lg overflow-hidden text-center">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-center w-16">선택</th>
                <th className="py-3 px-4 text-center">이름</th>
                <th className="py-3 px-4 text-center">회원 번호</th>
                <th className="py-3 px-4 text-center">전화번호</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${index % 2 === 1 ? "bg-blue-50" : ""} ${
                    user.selected ? "bg-blue-100" : ""
                  }`}>
                  <td className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={user.selected}
                      onChange={() => handleSelect(user.id)}
                      className="w-5 h-5"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">{user.name}</td>
                  <td className="py-3 px-4 text-center">{user.memberNum}</td>
                  <td className="py-3 px-4 text-center">{user.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        userName={selectedUser?.name || ""}
      />
    </div>
  );
}
