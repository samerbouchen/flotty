'use strict';
const db = require ('../models/index');
async function connection() {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const init = async () => {
    db.sequelize
        .sync({force : true})
        .then(result => {
            console.log( "results => " , result );
        })
        .catch(err => {
            console.log(err);
        });
    console.log('Tables have synced!')
}

module.exports= {
    connection,
    init
}