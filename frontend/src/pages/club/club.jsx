import styles from "./club.module.scss";
import { useState } from "react";

// components
import Select from "../../components/Select/Select";
import ClubContent from "../../components/ClubContent/ClubContent";

const Club = () => {
  // 모집 상태 옵션
  const statusOptions = [
    {
      label: "전체",
      value: "all",
    },
    {
      label: "모집 중",
      value: "recruiting",
    },
    {
      label: "모집 완료",
      value: "recruited",
    },
  ];

  // 동아리 리스트 더미
  const clubList = [
    {
      id: 1,
      name: "독독서서",
      status: "recruiting",
      description: "독서 동아리입니다.",
      gender: "woman",
      address: "서울시 강남구 역삼동",
      memberCount: 10,
      maxMemberCount: 20,
      minMemberCount: 5,
      memberCurrent: 10,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
    },
    {
      id: 2,
      name: "자동차 동아리",
      status: "recruiting",
      description: "자동차 동아리입니다.",
      gender: "man",
      address: "서울시 강남구 역삼동",
      memberCount: 10,
      maxMemberCount: 20,
      minMemberCount: 5,
      memberCurrent: 10,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
    },
    {
      id: 3,
      name: "독서 동아리",
      status: "recruiting",
      description: "독서 동아리입니다.",
      gender: "woman",
      address: "서울시 강남구 역삼동",
      memberCount: 10,
    },
    {
      id: 4,
      name: "독서 동아리",
      status: "recruiting",
      description: "독서 동아리입니다.",
      gender: "woman",
      address: "서울시 강남구 역삼동",
      memberCount: 10,
    },
    {
      id: 5,
      name: "독서 동아리",
      status: "recruiting",
      description: "독서 동아리입니다.",
      gender: "woman",
      address: "서울시 강남구 역삼동",
      memberCount: 10,
    },
  ];

  // 모집 상태 선택 상태
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // 모집 상태 변경 시
  const handleStatusChange = (option) => {
    setSelectedStatus(option.value);
  };

  // 동아리 생성 버튼 클릭 시
  const handleCreateClub = () => {
    // navigate("/club/create");
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.header}>
          <div className={styles.header_title}>Choose Your Club</div>
          <div className={styles.header_content}>
            <div>
              <Select
                options={statusOptions}
                value={selectedStatus}
                onChange={handleStatusChange}
                placeholder="전체"
                width="100px"
              />
            </div>
            <div className={styles.search_container}>
              <input
                type="text"
                placeholder="검색"
                className={styles.search_input}
              />
              <button className={styles.search_button}>검색</button>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          {clubList.map((club, index) => (
            <ClubContent
              key={club.id || index}
              content={club}
              index={index}
              isHovered={hoveredCardId === club.id}
              hasHoveredSibling={!!hoveredCardId}
              onMouseEnter={() => setHoveredCardId(club.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            />
          ))}
        </div>

        {/* 동아리 생성 버튼 */}
        <div
          className={styles.create_club_button_container}
          onClick={handleCreateClub}
        >
          <button className={styles.create_club_button}>+</button>
        </div>
      </div>
    </div>
  );
};

export default Club;
