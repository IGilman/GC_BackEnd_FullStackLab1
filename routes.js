const express = require("express");
const todo = express.Router();
const pool = require("./connection")
const todoURI = "/todo";

todo.get(todoURI, (request, response) => {
    pool.query("SELECT * FROM todos").then((result) => {
        console.log(result.rows)
        response.json(result.rows);
    })
});

todo.post(todoURI, (request, response) => {
    pool.query("INSERT INTO todos (task, completed) VALUES ($1::text,$2::boolean)",
        [request.body.task, false]).then(() => {
            response.json(request.body)
        });
});

//I didn't figure out the put/clicking the completed button

todo.put(`${todoURI}/:id`, (request, response) => {
    pool.query("UPDATE todos SET completed=$1::boolean WHERE id=$2::int", [request.body.completed, request.params.id]).then(() => {
        response.json(request.body);
    });
});

todo.delete(`${todoURI}/:id`, (request, response) => {
    pool.query("DELETE FROM todos WHERE id=$1::int", [request.params.id]).then(() => {
        response.status(204).json(`${request.params.id}`);
    });
});

module.exports = { todo };