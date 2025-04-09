import {useParams, Link} from "react-router-dom";

const StoreDetail = () => {
    const {id} = useParams();

    return(
        <div>
            <h1>店舗：{id}</h1>
            <p>店舗{id}の詳細情報</p>
            <Link to={`/store/${id}/reserve`}>
                <button>この店舗を予約する</button>
            </Link>
        </div>
    )
};

export default StoreDetail;