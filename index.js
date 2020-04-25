const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');

const categoriesController = require("./categories/CategoriesController");
const ArticlesController = require("./articles/ArticlesController");


const Article = require('./articles/Article');
const Category = require('./categories/Category');

// VIEW ENGINE
app.set('view engine', 'ejs');

// statick
app.use(express.static('public'))



// body perser
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());


// database
connection
  .authenticate()
  .then(() => {
    console.log('conexão feita com sucesso');
  }).catch((error) => console.log("Erro: ", error));


app.get("/", (req, res) => {
  res.render("index");
})

app.use("/", categoriesController);
app.use("/", ArticlesController);

app.listen(8080, () => {
  console.log("Server On");
});