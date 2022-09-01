const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
dotenv.config();

const DB = require('./db');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/rating', DB.getRating);
app.post('/rating', DB.createRating);
app.patch('/user', DB.updateUsername);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
