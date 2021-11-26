const router = require("express").Router();
const Movie = require("../models/Movie.model");

router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      console.log("All the movies:", movies);
      res.render("movies/movies", { movies });
    })
    .catch((err) => {
      console.log("Error listing all movies", err);
    });
});

router.get("/create", (req, res) => {
  res.render("movies/new-movie");
});

router.post("/create", (req, res) => {
    //   console.log(req.body)
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then((movie) => {
      console.log("Created movie:", movie);
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Error creating movie", err);
      res.render("movies/new-movie");
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
  .populate("cast")
    .then((movie) => {
      console.log("Here's your movie:", movie);
      res.render("movie/movie-details", { movie });
    })
    .catch((err) => {
      console.log("Error finding movie", err);
    });
});

router.post("/:id/delete", (req, res) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      console.log("Here's your movie:", movie);
      res.render("movies/edit-movie", { movie });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
