import { useEffect, useState } from "react";

function Time() {
  const [timeInfo, setTimeInfo] = useState({
    time: '',
    day: '',
    date: '',
    month: '',
    year: '',
    week: '',
  });

  const updateTimeInfo = () => {
    const now = new Date();

    const time = now.toLocaleTimeString('en-GB');

    const dayOfWeek = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ][now.getDay()];

    const monthText = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ][now.getMonth()];

    const getWeekNumber = (date) => {
      const startOfYear = new Date(date.getFullYear(), 0, 1);
      const pastDaysOfYear = (date - startOfYear) / 86400000; 
      return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    };

    setTimeInfo({
      time: time,
      day: dayOfWeek,
      date: now.getDate(),
      month: monthText,
      year: now.getFullYear(),
      week: getWeekNumber(now),
    });
  };

  useEffect(() => {
    updateTimeInfo();
    const interval = setInterval(updateTimeInfo, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p className="time">{timeInfo.time}</p>
      <p className="info">
        {timeInfo.day}, {timeInfo.date} {timeInfo.month} {timeInfo.year}, week {timeInfo.week}
      </p>
    </>
  );
}

export default Time;
