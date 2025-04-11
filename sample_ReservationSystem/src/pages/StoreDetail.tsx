import '../css/StoreDetail.css';
import {useParams, Link, useLocation} from "react-router-dom";

const StoreDetail = () => {
    const {id} = useParams(); /*useParams() はルーティングで指定された /store/:id のような「:xxx」の値だけを渡してくれるもの*/ 
    const location = useLocation();
    const { name, description, place, price, imgpass } = location.state || {};

    return(
        <div className='page'>
            <header className="header">
                <Link to={`/`}>
                    <img src="/img/logo.png" className="header__logo"></img>
                </Link>
                <img src="" className="header__user-icon"></img>
            </header>
            <div className='detail'>
                <h1>{name}</h1>
                <div className='detail-img-container'>
                    <img src={imgpass}></img>
                </div>
                <p>{name}</p>
                <p>{description}</p>
                <p>{place}</p>
                <p>値段：{price}円～</p>
                <Link to={`/store/${id}/reserve`}
                    state={{
                        name:name,
                        description: description,
                        place: place,
                        price: price,
                        imgpass: imgpass,
                    }}
                    key={id}
                >
                    <button>この店舗を予約する</button>
                </Link>
            </div>
        </div>
    )
};

export default StoreDetail;