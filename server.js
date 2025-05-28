const express = require('express');
const cors = require('cors');
const { initDb } = require('./data/database');

const app = express();

// ミドルウェア
app.use(cors());
app.use(express.json());

// ルート
app.use('/items', require('./routes/items'));

// サーバー起動
const port = process.env.PORT || 3001;

initDb((err) => {
    if (err) {
        console.error('❌ Failed to connect to the database:', err);
    } else {
        app.listen(port, () => {
            console.log(`✅ Database is connected. Server is running on port ${port}`);
        });
    }
});