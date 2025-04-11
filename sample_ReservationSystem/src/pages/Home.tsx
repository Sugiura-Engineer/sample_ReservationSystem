import '../css/Home.css';

import {Link} from "react-router-dom";
import {useEffect, useState} from "react";//待機して発火する、普通のJSの関数だと思っておいていい感じ、useEffect=ページが表示されたときや、特定の変数が変わったときに、自動で何かの処理をやらせる機能.

const Home = () => {
    //imgscroll.
    const [imgUrl, setImgUrl] = useState("");
    useEffect(() => {
        const fetchImage = async () => {
          try {
            const res = await fetch("http://localhost:3001/api/image");
            const data = await res.json();
            setImgUrl(data.imgpass); // "/img/xxx.jpg" をセット.
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
        setFilteredStores(data); // 初期表示：すべて
    };
    fetchStores();
    },[]);

    //検索機能.useStateはReactの持つ、変化する値や状態を管理する仕組み
    const [keyword, setKeyword] = useState(""); //kwywordは入力された文字列のこと、setKeywordはこれを使う関数、useStateで初期値を空の文字列に、
    const [filteredStores, setFilteredStores] = useState([]);

    const handleSearch=()=>{
        const results = stores.filter((store) =>
        store.name.includes(keyword)
        )
        setFilteredStores(results);
    };
    
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
                    <input type="text" placeholder="   キーワードを入力" className="keyword-form"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>検索</button>
                </div>
            </div>
            <div className='tag'>
                <a>お店一覧</a>
            </div>

            <div className='stores'>
                <div className='store-list'>
                    {filteredStores.length > 0 ? (
                        filteredStores.map((store) => (
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
                    ))
                ): (
                    <p>ヒットしませんでした</p>
                    )}
                </div>                  
            </div>
        </div>
    </>
);}

export default Home;

