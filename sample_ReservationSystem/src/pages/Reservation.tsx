import {useParams} from "react-router-dom";

const Reservation =() => {
    const {id} = useParams(); 
    
    const handleReserve = async () => {
        const res = await fetch("http://localhost:3001/api/reserve",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                storeId:id,
                userName:"山田太郎",
                date:"2025-04-09",
                time:"18:00",
            }),
        });

        const data = await res.json();
        alert(data.message); //予約受け取りました、で成功.
    }

    return(
        <div>
            <h1>店の{id}予約ページ</h1>
            <p>
                ここにカレンダーやフォームやらを置く
            </p>
            <button onClick ={handleReserve}>予約する</button>
        </div>
    )
};

export default Reservation;