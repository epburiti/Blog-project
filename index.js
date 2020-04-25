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
  Article.findAll({
    order: [['id', 'DESC']]
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render("index", { articles: articles, categories: categories });
    })
  })
})
app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug
    }
  }).then(article => {
    if (article != undefined) {
      Category.findAll().then(categories => {
        res.render("article", { article: article, categories: categories });
      })
    } else {
      res.redirect("/");
    }
  }).catch(err => {
    res.redirect("/");
  });
})
app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: {
      slug: slug
    }, include: [{ model: Article }]
  }).then(category => {
    if (category != undefined) {
      category.findAll().then(categories => {
        res.render("index", { articles: category.articles, categories })
      })
    } else {
      res.redirect("/");
    }
  }).catch(error => {
    res.redirect("/");
  })
})

app.use("/", categoriesController);
app.use("/", ArticlesController);

app.listen(8080, () => {
  console.log("Server On");
});