import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

export default function UserManagementDesk() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [users, setUsers] = useState([
    { id: "1", name: "노주희", phoneNumber: "01084624534", selected: false },
    { id: "2", name: "신선우", phoneNumber: "01063872523", selected: false },
    { id: "3", name: "구혜원", phoneNumber: "01023451232", selected: false },
    { id: "4", name: "신민서", phoneNumber: "01012340192", selected: false },
  ]);

  // 체크박스 핸들러
  const handleSelect = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, selected: !user.selected } : user
    );
    setUsers(updatedUsers);
    setSelectedUsers(
      updatedUsers.filter((user) => user.selected).map((user) => user.id)
    );
  };

  // 검색 핸들러
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 검색 필터
  const filteredUsers = users.filter(
    (user) =>
      user.name.includes(searchTerm) ||
      user.id.includes(searchTerm) ||
      user.phoneNumber.includes(searchTerm)
  );

  // 회원삭제
  const handleDelete = () => {
    if (selectedUsers.length === 0) {
      alert("삭제할 회원을 선택해주세요.");
      return;
    }

    if (window.confirm("선택한 회원을 정말 삭제하시겠습니까?")) {
      const updatedUsers = users.filter(
        (user) => !selectedUsers.includes(user.id)
      );
      setUsers(updatedUsers);
      setSelectedUsers([]);
    }
  };

  // 회원 수정
  const handleEdit = () => {
    if (selectedUsers.length !== 1) {
      alert("수정할 회원을 한 명만 선택해주세요.");
      return;
    }

    navigate(`/admin/edit-user/${selectedUsers[0]}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* 헤더 */}
      <div className="relative flex justify-center items-center py-7.5 text-[35px] font-bold border-b border-gray-300 w-full">
        <Link to="/admin/admin-main" className="absolute left-7">
          <IoChevronBack size={45} />
        </Link>

        <span>회원 관리</span>
      </div>

      {/* 회원 검색 */}
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
        {/* 선택된 항목 & 추가수정삭제 버튼 */}
        <div className="w-full flex justify-between items-center font-bold mb-4 px-5">
          <div>{selectedUsers.length}개 항목</div>
          <div>
            <button
              className="cursor-pointer bg-[#44A4FA] text-white h-7.5 w-19 rounded-lg px-4 py-1"
              onClick={() => {
                navigate("/admin/add-user");
              }}>
              추가
            </button>

            <button
              className="cursor-pointer bg-[#D9D9D9] text-[#575454] h-7.5 w-19 rounded-lg mx-4 px-4 py-1"
              onClick={handleEdit}>
              수정
            </button>

            <button
              className="cursor-pointer bg-[#FC7B7B] text-white h-7.5 w-19 rounded-lg px-4 py-1"
              onClick={handleDelete}>
              삭제
            </button>
          </div>
        </div>

        {/* 회원 정보 테이블 */}
        <div className="w-full border rounded-lg overflow-hidden text-center">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-center w-16">선택</th>
                <th className="py-3 px-4 text-center">이름</th>
                <th className="py-3 px-4 text-center">회원 ID</th>
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
                  <td className="py-3 px-4 text-center">{user.id}</td>
                  <td className="py-3 px-4 text-center">{user.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 (필요한 경우) */}
        <div className="flex justify-center mt-6">
          {/* 페이지네이션 컴포넌트를 여기에 추가 */}
        </div>
      </div>
    </div>
  );
}
