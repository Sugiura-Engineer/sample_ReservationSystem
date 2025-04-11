import '../css/Reservation.css';
import {Link, useParams,useLocation} from "react-router-dom";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

const Reservation =() => {
    const {id} = useParams(); 
    const location = useLocation();
    const { name, description, place, price, imgpass } = location.state || {};
    
    const [userName,setUserName] = useState("");
    const [date, setDate] = useState("2025-04-01");
    const [time, setTime] = useState("12:00");

    const navigate = useNavigate();

    const handleReserve = async () => {
        if(!userName || !date || !time){
            alert("入力していない項目があります");
            return;
        }
        const res = await fetch("http://localhost:3001/api/reserve",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                storeId:id,
                userName:userName,
                date:date,
                time:time,
            }),
        });

        const data = await res.json();
        if (data.message) {
            navigate("/complete", {
                state: {
                  storeName: name,
                  userName,
                  date,
                  time,
                },
              }); //  ここで遷移！
        }
    }

    return(
        <div className="reservation-page">
            <header className="header">
                <Link to={`/`}>
                    <img src="/img/logo.png" className="header__logo"></img>
                </Link>
                    <img src="" className="header__user-icon"></img>
            </header>
            <div className='reserve'>
                <h1>{name}：予約ページ</h1>

                <br />
                <label>
                    予約名：
                    <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="お名前を入力してください"
                />
                </label>
                <br/>
                <label>
                    予約来店日：
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                </label>

                <br />
                
                <label>
                    予約来店時間：
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)}/>
                </label>
                
                <br/>
                <br/>
                <button onClick ={handleReserve}>予約する</button>
            </div>
        </div>
    )
};

export default Reservation;