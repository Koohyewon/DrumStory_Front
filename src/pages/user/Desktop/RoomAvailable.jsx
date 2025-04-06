import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import axios from "../../../api/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

export default function RoomAvailable() {
  const location = useLocation();
  const navigate = useNavigate();
  const memberData = location.state?.passData || {}; // 기본값 제공

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
        resTimeIds: memberData.selectTimes?.map((time) => time.id) || [],
        resDate: memberData.resDate || "",
        roomId: selectedRoomId,
      };

      const response = await axios.post("/reservation/room/selected", data);

      const passData = response.data;
      console.log(response);
      if (response.status === 201) {
        navigate("/reservation-success", { state: { passData } });
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
  };

  const formatDateWithDay = (dateStr) => {
    if (!dateStr) return "날짜 정보 없음";

    try {
      const date = new Date(dateStr);
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      const formattedDate = dateStr.replaceAll("-", ".");
      const day = days[date.getDay()];
      return `${formattedDate}(${day})`;
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateStr; // 포맷팅 실패 시 원본 반환
    }
  };

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      setIsLoading(true);
      try {
        if (memberData?.resDate && memberData?.selectTimes?.length > 0) {
          const data = {
            resDate: memberData.resDate,
            resTimeIds: memberData.selectTimes.map((time) => time.id),
          };

          const response = await axios.post("/reservation/room", data);
          console.log("API response:", response.data);

          // API 응답 구조가 { name, availableRooms } 형태임
          if (response.data && Array.isArray(response.data.availableRooms)) {
            setAvailableRooms(response.data.availableRooms);
          } else {
            console.error(
              "API response structure is unexpected:",
              response.data
            );
            setAvailableRooms([]);
          }
        } else {
          console.warn("Missing required data for fetching rooms");
          setAvailableRooms([]);
        }
      } catch (error) {
        console.error("Error fetching available rooms:", error);
        setAvailableRooms([]);
      } finally {
        setIsLoading(false);
      }
    };

    console.log("Member data:", memberData);
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

  // 이용 가능한 방을 기준으로 roomOptions 생성
  const roomOptions = allRooms.map((room) => {
    // 상담실, 로비, 레슨 룸은 항상 비활성화
    if (room.alwaysDisabled) {
      return {
        id: null,
        name: room.name,
        position: room.position,
        disabled: true,
      };
    }

    // 이용 가능한 방 중에서 현재 방이 있는지 확인
    const availableRoom = availableRooms.find((r) => r?.roomNum === room.name);

    return {
      id: availableRoom?.id || null,
      name: room.name,
      position: room.position,
      disabled: !availableRoom, // 이용 가능한 방 목록에 없으면 비활성화
    };
  });

  // 방 위치에 따라 정렬
  const sortedRoomOptions = [...roomOptions].sort(
    (a, b) => (a?.position || 0) - (b?.position || 0)
  );

  // memberData가 없을 경우 안내 메시지 표시
  if (!memberData.resDate || !memberData.selectTimes) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
        <p>필요한 예약 정보가 없습니다. 이전 페이지로 돌아가세요.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-[#44A4FA] text-white px-6 py-2 rounded-lg">
          이전으로
        </button>
      </div>
    );
  }

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

          <p className="text-lg mt-3">
            {formatDateWithDay(memberData.resDate)} {memberData.startTime || ""}{" "}
            ~ {memberData.endTime || ""}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-20">
        <p className="font-bold text-lg mb-13">연습실 선택</p>
        <div className="flex flex-col items-center px-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <p>로딩 중...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-7 w-full h-70 ">
              {sortedRoomOptions.map((room) => (
                <button
                  key={room.position}
                  onClick={() => handleSelect(room)}
                  disabled={room.disabled}
                  className={`
                  rounded-lg px-4 py-6 text-xl font-medium border text-center
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
            disabled={selectedRoomId === null}
            className={`mt-25 rounded-xl text-xl font-bold w-[250px] py-3 transition-colors duration-200
            ${
              selectedRoomId === null
                ? "bg-white text-gray-400 border border-gray-300 cursor-not-allowed"
                : "bg-[#44A4FA] text-white cursor-pointer"
            }`}>
            선택
          </button>
        </div>
      </div>
    </div>
  );
}
