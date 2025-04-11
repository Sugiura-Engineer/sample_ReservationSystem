import '../css/Home.css';

import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Home = () => {
    //imgscroll.
    const [imgUrl, setImgUrl] = useState("");
    useEffect(() => {
        const fetchImage = async () => {
          try {
            const res = await fetch("http://localhost:3001/api/image");
            const data = await res.json();
            setImgUrl(data.imgpass); // "/img/xxx.jpg" をセット
          } catch (err) {
            console.error("画像取得失敗:", err);
          }
        };
    
        fetchImage();
    }, []);

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
        <div className="page">
            <header className="header">
                <Link to={`/`}>
                    <img src="/img/logo.png" className="header__logo"></img>
                </Link>
                <img src="" className="header__user-icon"></img>
            </header>
            <div className='img__scroll'>
                <div className='img_container1'></div>
                <div className='img_container2'></div>
                <div className='img_container3'></div>
            </div>
            <div className='search'>
                <div className='search__container'>
                    <input type="text" placeholder="   キーワードを入力" className="keyword-form"/>
                    <button className="search-button">検索</button>
                </div>
            </div>
            <div className='tag'>
                <a>お店一覧</a>
            </div>
            <div className='stores'>
                <div className='store-list'>
                    {stores.map((store) => (
                        <Link to={`/store/${store.id}`}
                            state={{
                                name: store.name,
                                description: store.description,
                                place: store.place,
                                price: store.price,
                                imgpass: store.imgpass,
                            }}
                            key={store.id}
                            className="store-box" // ← CSSここに付けよう！
                        >
                            <div className='store-img'></div>
                                <div className='store-desc'>
                                    <h2>{store.name}</h2>
                                    <p>{store.description}</p>
                                </div>
                        </Link>
                    ))}
                </div>                  
            </div>
        </div>
    </>
);}

export default Home;

