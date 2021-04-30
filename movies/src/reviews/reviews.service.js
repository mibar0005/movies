const { join, select } = require("../db/connection");
const knex = require("../db/connection");

function read(reviewId) {
    return knex("reviews").select("*").where({review_id:reviewId}).first();
}

async function readCritic(critic_id) {
    return knex("critics")
    .where({critic_id})
    .first()
}

async function setCritic(review) {
    review.critic = await readCritic(review.critic_id);
    return review;
} 

function update(updatedReview) {
    return knex("reviews")
    .where({ review_id : updatedReview.review_id })
    .update(updatedReview,"*")
    .then(()=>read(updatedReview.review_id))
    .then(setCritic)
}

function destroy(review_id) {
    return knex("reviews").where({review_id}).del();
}

function list(movie_id) {
    return knex("reviews")
    .where({movie_id})
    .then((reviews)=>Promise.all(reviews.map(setCritic)));
}

module.exports = {
    update,
    read,
    delete:destroy,
    list,
}