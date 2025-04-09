import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Home = () => {
    const [stores, setStores] = useState([]);

    useEffect(() =>{
        const fetchStores = async () =>{
        const res = await fetch("http://localhost:3001/api/stores");
        const data = await res.json();
        setStores(data);
    };
    fetchStores();
    },[]);

    return (
        <>
        <h1>お店一覧</h1>
        {stores.map((store) => (
            <div key={store.id}>
                <h2>{store.name}</h2>
                <p>{store.description}</p>
                <Link to={`/store/${store.id}`}>
                    <button>予約する</button>
                </Link>
            </div>
        ))}
        </>
    );
}

export default Home;

