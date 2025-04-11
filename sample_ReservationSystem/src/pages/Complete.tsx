import { useLocation, Link } from "react-router-dom";
import '../css/Complete.css';

const Complete = () => {
  const location = useLocation();
  const { storeName, userName, date, time } = location.state || {};

  return (
    <div className="complete-page">
        <header className="header">
            <Link to={`/`}>
                <img src="/img/logo.png" className="header__logo"></img>
            </Link>
            <img src="" className="header__user-icon"></img>
        </header>
        <div className="complete">
            <h1>予約を受け付けました</h1>
            <p><strong>店舗名：</strong>{storeName}</p>
            <p><strong>予約名：</strong>{userName}</p>
            <p><strong>来店日：</strong>{date}</p>
            <p><strong>来店時間：</strong>{time}</p>

            <Link to="/">
                <button>ホームに戻る</button>
            </Link>
        </div>
    </div>
  );
};

export default Complete;
