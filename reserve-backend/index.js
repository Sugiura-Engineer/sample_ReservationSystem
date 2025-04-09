const express = require('express');
const cors = require('cors');
const db = require('./db'); // ← ここを上に移動！
const app = express();
const port = 3001;

// ミドルウェア
app.use(cors());
app.use(express.json());

// APIエンドポイント：店舗一覧取得
app.get('/api/stores', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM stores');
    res.json(rows);
  } catch (err) {
    console.error('DBエラー:', err);
    res.status(500).json({ error: 'データ取得に失敗しました' });
  }
});

// APIエンドポイント：予約登録
app.post('/api/reserve', async (req, res) => {
  const { storeId, userName, date, time } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO reservations (store_id, user_name, date, time) VALUES (?, ?, ?, ?)',
      [storeId, userName, date, time]
    );

    console.log('予約完了:', { storeId, userName, date, time });
    res.json({ message: '予約を受け付けました！', id: result.insertId });
  } catch (err) {
    console.error('予約登録エラー:', err);
    res.status(500).json({ error: '予約の保存に失敗しました' });
  }
});

// サーバー起動
app.listen(port, () => {
  console.log(`サーバー起動中：http://localhost:${port}`);
});
