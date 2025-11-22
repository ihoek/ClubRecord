import { useState, useRef, useEffect } from "react";
import styles from "./Club.module.scss";

const Club = () => {
  const clublist = [
    {
      id: 1,
      name: "동아리 1",
    },
    {
      id: 2,
      name: "동아리 2",
    },
  ];

  const [selectedClub, setSelectedClub] = useState(clublist[0] || null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dropdownRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // 오늘 날짜 및 시간 포맷 (실시간 업데이트)
  const formattedDate = `${currentTime.getFullYear()}년 ${String(
    currentTime.getMonth() + 1
  ).padStart(2, "0")}월 ${String(currentTime.getDate()).padStart(
    2,
    "0"
  )}일 ${String(currentTime.getHours()).padStart(2, "0")}:${String(
    currentTime.getMinutes()
  ).padStart(2, "0")}:${String(currentTime.getSeconds()).padStart(2, "0")}`;

  const handleSelectClub = (club) => {
    setSelectedClub(club);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.today_date_section}>
          <span className={styles.date_label}>오늘 날짜</span>
          <span className={styles.date_value}>{formattedDate}</span>
        </div>
        <div className={styles.club_select_section} ref={dropdownRef}>
          <div className={styles.club_select} onClick={toggleDropdown}>
            <span className={styles.club_select_text}>
              {selectedClub ? selectedClub.name : "동아리 선택"}
            </span>
            <span
              className={`${styles.arrow} ${isOpen ? styles.arrow_open : ""}`}
            >
              ▼
            </span>
          </div>
          {isOpen && (
            <div className={styles.club_dropdown}>
              {clublist.map((club) => (
                <div
                  key={club.id}
                  className={`${styles.club_option} ${
                    selectedClub?.id === club.id
                      ? styles.club_option_selected
                      : ""
                  }`}
                  onClick={() => handleSelectClub(club)}
                >
                  {club.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.club_info_section}>
          {selectedClub && (
            <div className={styles.club_info_content}>
              <div className={styles.club_info_title}>{selectedClub.name}</div>
              <p>동아리 정보가 표시됩니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Club;
