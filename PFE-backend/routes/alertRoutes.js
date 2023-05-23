const express = require("express");
const route = express.Router();
const db = require('../models');
const User = require("../models/User");

route.post('/alert', async (req, res, next) => {
            const user = await db.user.findOne({ where: { id: req.body.id } });
            console.log(" debug => ", user);
            try {
                await db.alert.create({
                    alert: req.body.alert,
                    userId: user.id
                },{
                    includ: [ User ]
                }).then((response) => res.status(200).send(response))
                    .catch((err) => res.status(400).send(err))
            } catch (e) { console.log(e) }
        }
    )

route.get('/alert/:id', (req, res, next) => {
    db.alert.findAll({ where: { userId: req.params.id }} )
        .then((response) =>  {
            
            res.status(200).send(response) 
            
        } )
        .catch((err) => res.status(400).send(err))
})

module.exports = route;