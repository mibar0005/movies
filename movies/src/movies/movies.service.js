const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");
}

function listShowingNow() {
    return knex("movies_theaters as mt")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .distinct("m.movie_id", 
    "m.title", 
    "m.runtime_in_minutes", 
    "m.rating", 
    "m.description", "m.image_url")
    .where({"mt.is_showing":true});
}

function read(movie_id) {
    return knex("movies").select("*").where({movie_id}).first();
}

module.exports = {
    list,
    listShowingNow,
    read,
}