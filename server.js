const PORT = process.env.PORT || 3000;
const express = require('express');

const routes = require('./routes')
const db = require('./config/db')
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


//https://localhost:3000
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port https://localhost:${PORT}`);
    });
}) 


