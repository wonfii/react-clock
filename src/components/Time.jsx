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

  const LoadInfo = () => {
    const url = 'http://worldtimeapi.org/api/timezone/Europe/Kyiv';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const time = data.datetime.slice(11, 19); // Формат часу HH:MM:SS
        const date = new Date(data.datetime);

        // День тижня
        const dayOfWeek = [
          'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ][date.getDay()];

        // Місяць
        const monthText = [
          'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December'
        ][date.getMonth()];

        setTimeInfo({
          time: time,
          day: dayOfWeek,
          date: date.getDate(),
          month: monthText,
          year: date.getFullYear(),
          week: data.week_number,
        });

        console.log(data);
      })
      .catch(e => console.error('Error fetching time:', e));
  };

  useEffect(() => {
    LoadInfo();
    const interval = setInterval(() => {
      LoadInfo(); 
    }, 1000);

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
