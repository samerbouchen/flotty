const { response } = require("express");
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const route = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { json, append } = require("express/lib/response");



route.post('/register', async (req, res, next) => {

const user = await db.user.findOne({ where: { email: req.body.email } });
        if (user) {
            res.status(400).send({ error: 'this user exist' })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        try {
            await db.user.create({
                fullName: req.body.fullName,
                password: hashedPassword,
                email: req.body.email,
                role: 'user'
            }).then((response) => res.status(200).send(response))
                .catch((err) => res.status(400).send(err))
        } catch (e) { console.log(e) }
    }


)


const Privatekey = "aaaaa"
route.post('/login', async (req, res, next) => {
    const user = await db.user.findOne({ where: { email: req.body.email } });
    console.log("debug ", user);
    if (!user) {
        res.status(400).json({ msg: "invalid email or password " })
    } 
    else {
        await bcrypt.compare(req.body.password, user.password).then(same => {
            if (same) {
                if (user.blocked == true){
                    return res.status(401).json({ msg: " you are blocked !♥ " })
                }
                let token = jwt.sign({ id: user.id, username: user.id, role: user?.role }, Privatekey, {
                    expiresIn: "24h"
                })
                res.status(200).json({ token: token })
            } else {
                res.status(400).json({ msg: "ivalid password" })
            }

        })
    }


})


route.get('/user/:id', (req, res, next) => {
    db.user.findOne({ where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))


})
route.get('/users', (req, res, next) => {
    db.user.findAll()
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))
})
route.patch('/user/:id', async(req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    db.user.update({
        fullName: req.body.fullName,
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    }, { where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

})

route.delete('/user/:id', (req, res, next) => {
    db.user.destroy({ where: { id: req.params.id } })
        .then((response) => {
            return res.status(200).send({message: "deleted"})
         } 
         )
        .catch((err) => {
            console.log("error => ",err.message)
            return res.send(err)
        })
})


route.patch('/block-user/:id', async(req, res, next) => {
    db.user.update({
        blocked: req.body.blocked
    }, { where: { id: req.params.id } })
        .then((response) => res.status(200).send("user blocked"))
        .catch((err) => res.status(400).send(err))

})
module.exports = route;