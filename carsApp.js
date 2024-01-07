const express = require('express');
const bodyParser = require('body-parser');
const {checkUser} = require('./utils');
const {users, mongoDB} = require('./config');
const {search, create, update, deleteCar} = require('./service');
const MongoClient = require('mongodb').MongoClient;

const {host, dbName, password, userName} = mongoDB;
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => checkUser({req, res, next}, {users}));

const mongoClient = new MongoClient(`mongodb://${userName}:${password}@${host}/${dbName}`);

(async() => {
  try {
    await mongoClient.connect();

    app.locals.collection = mongoClient.db("admin").collection("cars");
    app.listen(port);
    console.log("Сервер ожидает подключения...");
  } catch(err) {
    return console.log(err);
  }
})();

app.get('/cars/', (req, res) =>
  search(req, res)
);

app.post('/cars/', (req, res) =>
  create(req, res)
);

app.put('/cars/:id', (req, res) =>
  update(req, res)
);

app.delete('/cars/:id', (req, res) =>
  deleteCar(req, res)
);