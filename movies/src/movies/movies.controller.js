const service = require("./movies.service");

async function movieExists(req,res,next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: `Movie cannot be found`
  })
}

async function list(req, res) {
  const { is_showing } = req.query;
  if (is_showing === "true") {
    const data = await service.listShowingNow();
    return res.json({ data });
  }
  const data = await service.list();
  res.json({ data });
}

async function read(req,res,next) {
  res.json({data:res.locals.movie})
}

module.exports = {
  list,
  read: [movieExists,read],
  movieExists,
};