const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      console.log("All the celebrities:", celebrities);
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => {
      console.log("Error listing all celebrities", err);
    });
});

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
const { name, occupation, catchphrase } = req.body;
  Celebrity.create({ name, occupation, catchphrase })
    .then((celebrity) => {
      console.log("Created celebrity:", celebrity);
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("Error creating celebrity", err);
      res.render("celebrities/new-celebrity")
    });
});

module.exports = router;
