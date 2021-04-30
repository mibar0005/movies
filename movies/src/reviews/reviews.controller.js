const knex = require("../db/connection");
const service = require("./reviews.service");
const methodNotAllowed = require("../errors/methodNotAllowed")

async function reviewExists(req,res,next) {
    const review = await service.read(req.params.reviewId);
    if(review) {
        res.locals.review = review;
        return next();
    }
    next({
        status: 404,
        message: `${req.params.reviewId} cannot be found`
    })
}

async function movieExists(req,res,next) {
    const { movieId } = req.params;
    if(movieId) {
        return next();
    }
    methodNotAllowed(req, res, next);
}

async function update(req, res) {
    const updatedReview = {
        ...req.body.data,
        review_id: req.params.reviewId
    };
    const data = await service.update(updatedReview);
    res.json({data});
}

async function read(req,res) {
    res.json({data:res.locals.review})
}

async function destroy(req,res) {
    const { review } = res.locals;
    await service.delete(review.review_id);
    res.sendStatus(204);
}

async function list(req,res) {
    const data = await service.list(req.params.movieId);
    res.json({data});
}

module.exports = {
    update: [reviewExists, update],
    read: [reviewExists,read],
    delete: [reviewExists,destroy],
    list: [movieExists, list],
}