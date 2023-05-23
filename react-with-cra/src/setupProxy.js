const express = require('express')

module.exports = function (app) {
    app.use(express.json())

    const movies = []
    app.get('/api/movies', function (req, res) {
        res.send(movies)
    })
    app.post('/api/movies', function (req, res) {
        movies.push({
            ...req.body,
            id: movies.length + 1,
        })
        res.send({})
    })
}
