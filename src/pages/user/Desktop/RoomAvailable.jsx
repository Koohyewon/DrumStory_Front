import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import axios from "../../../api/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

export default function RoomAvailable() {
  const location = useLocation();
  const navigate = useNavigate();
  const memberData = location.state?.passData;

  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelect = (room) => {
    if (!room.disabled) {
      setSelectedRoomId(room.id);
    }
  };

  const handleSubmit = async () => {
    if (selectedRoomId === null) return;

    try {
      const data = {
        resTimeIds: memberData.selectTimes.map((time) => time.id),
        resDate: memberData.resDate,
        roomId: selectedRoomId,
      };

      const response = await axios.post("/reservation/room/selected", data);

      const passData = response.data;
      console.log(response);
      if (response.status == 201) {
        navigate("/reservation-success", { state: { passData } });
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
  };

  const formatDateWithDay = (dateStr) => {
    const date = new Date(dateStr);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const formattedDate = dateStr.replaceAll("-", ".");
    const day = days[date.getDay()];
    return `${formattedDate}(${day})`;
  };

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      setIsLoading(true);
      try {
        if (memberData?.resDate && memberData?.selectTimes) {
          const data = {
            resDate: memberData.resDate,
            resTimeIds: memberData.selectTimes.map((time) => time.id),
          };

          const response = await axios.post("/reservation/room", data);
          setAvailableRooms(response.data);

          const mockResponse = {
            data: [
              { roomNum: "1번 방", id: 1 },
              { roomNum: "2번 방", id: 2 },
              { roomNum: "3번 방", id: 3 },
              { roomNum: "4번 방", id: 4 },
              { roomNum: "5번 방", id: 5 },
            ],
          };

          setAvailableRooms(mockResponse.data);
        }
      } catch (error) {
        console.error("Error fetching available rooms:", error);
      } finally {
        setIsLoading(false);
      }
    };
    console.log(memberData);
    fetchAvailableRooms();
  }, [memberData]);

  const allRooms = [
    { name: "1번 방", position: 0 },
    { name: "2번 방", position: 1 },
    { name: "3번 방", position: 2 },
    { name: "Lesson Room", position: 3, alwaysDisabled: true },
    { name: "상담실", position: 4, alwaysDisabled: true },
    { name: "4번 방", position: 5 },
    { name: "5번 방", position: 6 },
    { name: "Lobby", position: 7, alwaysDisabled: true },
  ];

  const roomOptions = allRooms.map((room) => {
    const availableRoom = availableRooms.find((r) => r.roomNum === room.name);
    return {
      id: availableRoom?.id || null,
      name: room.name,
      position: room.position,
      disabled: room.alwaysDisabled || !availableRoom,
    };
  });

  roomOptions.sort((a, b) => a.position - b.position);

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="text-xl font-bold border-b-2 border-black/[.2] pb-6">
        <div className="flex justify-between pt-7 px-7">
          <button className="text-lg" onClick={() => navigate(-1)}>
            <IoIosArrowBack size={38} />
          </button>
          <p>
            {memberData?.name || "회원"}
            <span className="font-medium">님</span>
          </p>
        </div>

        <div className="text-center">
          <p>예약 시간</p>
          {memberData && memberData.selectTimes?.length >= 2 ? (
            <p className="text-lg mt-3">
              {formatDateWithDay(memberData.resDate)} {memberData.startTime} ~{" "}
              {memberData.endTime}
            </p>
          ) : (
            <p className="text-lg mt-3 text-gray-400">예약 정보 없음</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6">
        <p className="font-semibold text-lg mb-4 self-start">연습실 선택</p>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>로딩 중...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-xl">
            {roomOptions.map((room) => (
              <button
                key={room.position}
                onClick={() => handleSelect(room)}
                disabled={room.disabled}
                className={`
                  rounded-lg px-4 py-6 text-sm font-medium border text-center
                  ${
                    room.disabled
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : selectedRoomId === room.id
                      ? "bg-[#44A4FA] text-white"
                      : "bg-white hover:bg-blue-100"
                  }
                `}>
                {room.name}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="mt-8 bg-[#44A4FA] text-white px-8 py-3 rounded-lg font-semibold w-32 disabled:opacity-50"
          disabled={selectedRoomId === null}>
          선택
        </button>
      </div>
    </div>
  );
}
