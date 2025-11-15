import { useState, useMemo } from "react";
import styles from "./Calendar.module.scss";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 샘플 이벤트 데이터 (이미지 기반)
  const events = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 샘플 이벤트 (실제로는 props나 API에서 받아올 수 있음)
    return {
      // 예시 이벤트들
      [`${year}-${month + 1}-4`]: [
        { title: "Tennis with Augusti", type: "social" },
      ],
      [`${year}-${month + 1}-7`]: [{ title: "Labor Day", type: "holiday" }],
      [`${year}-${month + 1}-9`]: [
        { title: "Meeting at Fay-Sch", type: "appointment" },
      ],
      [`${year}-${month + 1}-12`]: [
        { title: "Elliot's birthday", type: "social" },
      ],
      [`${year}-${month + 1}-13`]: [
        { title: "Tennis with Leland", type: "social" },
      ],
      [`${year}-${month + 1}-14`]: [
        { title: "Tennis with Angie", type: "social" },
        { title: "Appt with Dr. Mr. M", type: "appointment" },
      ],
      [`${year}-${month + 1}-15`]: [
        { title: "Appt with Dr. Uriel", type: "appointment" },
      ],
      [`${year}-${month + 1}-16`]: [
        { title: "Appt with Dr. Miss", type: "appointment" },
      ],
      [`${year}-${month + 1}-21`]: [
        { title: "Tennis with Tomas", type: "social" },
        { title: "Tennis with Stanley", type: "social" },
      ],
      [`${year}-${month + 1}-23`]: [
        { title: "Walk the dogs", type: "appointment" },
      ],
      [`${year}-${month + 1}-25`]: [
        { title: "Bring dinner for ton", type: "task" },
      ],
      [`${year}-${month + 1}-27`]: [
        { title: "Eliza & Vincenzo's", type: "social" },
      ],
      [`${year}-${month + 1}-30`]: [
        { title: "Walk the dogs", type: "appointment" },
      ],
    };
  }, [currentDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 월 이름 배열
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // 요일 이름 배열
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // 캘린더 그리드 생성
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // 이전 달의 마지막 날들 추가
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonthLastDay - i),
      });
    }

    // 현재 달의 날들 추가
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i),
      });
    }

    // 다음 달의 첫 날들 추가 (총 42개 셀을 채우기 위해)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, i),
      });
    }

    return days;
  }, [year, month]);

  // 오늘 날짜 확인
  const today = new Date();
  const isToday = (date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // 이벤트 타입별 색상 가져오기
  const getEventColor = (type) => {
    const colors = {
      appointment: { color: "#ff6b9d", borderColor: "#ff1744" },
      social: { color: "#ffd54f", borderColor: "#ffc107" },
      holiday: { color: "#a5d6a7", borderColor: "#4caf50" },
      task: { color: "#90caf9", borderColor: "#2196f3" },
    };
    return colors[type] || colors.appointment;
  };

  // 날짜 키 생성
  const getDateKey = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  return (
    <div className={styles.container}>
      {/* 헤더: 월/년도 및 네비게이션 */}
      <div className={styles.header}>
        <button className={styles.navButton} onClick={goToPreviousMonth}>
          ←
        </button>
        <div className={styles.monthYear}>
          {monthNames[month]} {year}
        </div>
        <button className={styles.navButton} onClick={goToNextMonth}>
          →
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className={styles.weekdays}>
        {dayNames.map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className={styles.daysGrid}>
        {calendarDays.map((day, index) => {
          const dateKey = getDateKey(day.fullDate);
          const dayEvents = events[dateKey] || [];
          const isCurrentDay = isToday(day.fullDate);

          return (
            <div
              key={index}
              className={`${styles.dayCell} ${
                !day.isCurrentMonth ? styles.otherMonth : ""
              }`}
            >
              <div className={styles.dayCell_content}>
                <div className={styles.dayNumber}>
                  <span>{day.date}</span>
                  {isCurrentDay && <span className={styles.today}></span>}
                </div>
              </div>
              <div className={styles.events}>
                {dayEvents.map((event, eventIndex) => {
                  const eventColor = getEventColor(event.type);
                  return (
                    <div
                      key={eventIndex}
                      className={styles.event}
                      style={{
                        backgroundColor: eventColor.color,
                        borderLeftColor: eventColor.borderColor,
                      }}
                    >
                      {event.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
