const express = require('express');
const cors = require('cors');
const { initDb } = require('./data/database');
const path = require('path');

// Swagger関連
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require(path.join(__dirname, 'swagger.json'));

const app = express();

// ✅ ミドルウェア
app.use(cors());
app.use(express.json());

// ✅ Swaggerのルート
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ APIルート
app.use('/items', require('./routes/items'));
app.use('/users', require('./routes/users'));

// ✅ サーバー起動
const port = process.env.PORT || 3001;

initDb((err) => {
    if (err) {
        console.error('❌ Failed to connect to the database:', err);
    } else {
        app.listen(port, () => {
            console.log(`✅ Database is connected. Server is running on port ${port}`);
            console.log(`📘 Swagger UI available at http://localhost:${port}/api-docs`);
        });
    }
});
