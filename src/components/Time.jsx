import { useEffect, useState } from "react";

function Time(){

    const [time, setTime] = useState('');

    const LoadTime=() => {
        const url = 'http://worldtimeapi.org/api/timezone/Europe/Kyiv';

        fetch(url).then(res => res.json()).then(data =>{
            const time = data.datetime.slice(11, 19); 
            setTime(time);
            console.log(data)
        })
        .catch(e=>console.error('Error fetching time:', e));
    }

    useEffect(()=>{
        LoadTime();

        const interval = setInterval(() => {
            LoadTime(); 
        }, 1000);

        return () => clearInterval(interval);

    },[])

    const[day, setDay] = useState('');
    const[date, setDate] = useState('');
    const[month, setMonth] = useState('');
    const[year, setYear] = useState('');
    const[week, setWeek] = useState('');


    const LoadInfo=()=>{
        const url = 'http://worldtimeapi.org/api/timezone/Europe/Kyiv';

        fetch(url)
            .then(res => res.json())
            .then(data=>{
                const day = new Date(data.datetime).getDay();

                let dayOfWeek = '';
                switch (day) {
                    case 1:
                        dayOfWeek = 'Monday';
                        break;
                    case 2:
                        dayOfWeek = 'Tuesday';
                        break;
                    case 3:
                        dayOfWeek = 'Wednesday';
                        break;
                    case 4:
                        dayOfWeek = 'Thursday';
                        break;
                    case 5:
                        dayOfWeek = 'Friday';
                        break;
                    case 6:
                        dayOfWeek = 'Saturday';
                        break;
                    case 0:
                        dayOfWeek = 'Sunday';
                        break;
                    default:
                        dayOfWeek = 'Unknown';
                }

                setDay(dayOfWeek);
                console.log(dayOfWeek);

                const date = new Date(data.datetime).getDate();
                setDate(date);
                console.log(date);

                const month = new Date(data.datetime).getMonth();
                let monthText = '';
                switch (month) {
                    case 0:
                        monthText = 'January';
                        break;
                    case 1:
                        monthText = 'February';
                        break;
                    case 2:
                        monthText = 'March';
                        break;
                    case 3:
                        monthText = 'April';
                        break;
                    case 4:
                        monthText = 'May';
                        break;
                    case 5:
                        monthText = 'June';
                        break;
                    case 6:
                        monthText = 'July';
                        break;
                    case 7:
                        monthText = 'August';
                        break;
                    case 8:
                        monthText = 'September';
                        break;
                    case 9:
                        monthText = 'October';
                        break;
                    case 10:
                        monthText = 'November';
                        break;
                    case 11:
                        monthText = 'December';
                        break;
                    default:
                        monthText = 'Unknown';
                }
                setMonth(monthText);
                console.log(month);

                const year = new Date(data.datetime).getFullYear();
                setYear(year);
                console.log(year);
                ;
                setWeek(data.week_number);
                console.log(data.week_number);
            })
            .catch(e=>console.error('Error fetching time:', e));
    }

    useEffect(()=>{
        LoadInfo();
    },[])

    return(
        <>
            <p className="time">{time}</p>
            <p className="info">{day}, {date} {month} {year}, week {week}</p>
        </>
    );
}

export default Time
