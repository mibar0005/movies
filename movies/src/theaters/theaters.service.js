const { select } = require("../db/connection");
const knex = require("../db/connection");

async function addMovie(theater) {
    theater.movies = await knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .where({"movies_theaters.theater_id":theater.theater_id})

    return theater;
}

function list() {
    return knex("theaters")
    .select("*")
    .then((data)=>Promise.all(data.map(addMovie)))
    
}

function readTheater(theater_id) {
    return knex("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .select("*")
    .where({"theaters.theater_id":theater_id})

}

module.exports = {
    list,
    readTheater,
}