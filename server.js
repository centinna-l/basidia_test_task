const express = require('express');
const app = express();
const sequelize = require("./db");

const PORT = 8000;

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);


app.get('/', (req, res) => {
    try {
        res.status(200).json({
            "message": "Server Up and Running"
        })
    } catch (e) {
        res.status(503).json({ e });
    }
});

app.listen(PORT, async () => {
    console.log(`Server Running on Port: ${PORT}`);
});