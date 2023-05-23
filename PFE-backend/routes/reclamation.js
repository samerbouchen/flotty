const express = require("express");
const route = express.Router();
const db = require('../models');

route.post('/reclamation', async (req, res, next) => {
            const user = await db.user.findOne({ where: { id: req.body.id } });
            try {
                await db.reclamation.create({
                    reclamation: req.body.reclamation,
                    user: user.email,
                }).then((response) => res.status(200).send(response))
                    .catch((err) => res.status(400).send(err))
            } catch (e) { console.log(e) }
        }
    )

route.get('/reclamations', (req, res, next) => {
    db.reclamation.findAll()
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))
})

route.get('/affectations', (req, res, next) => {
    db.affectation.findAll()
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))
})
module.exports = route;