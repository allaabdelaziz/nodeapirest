//const express = require('express')
import express from 'express'
import { success, getUniqueId } from './src/helper/helper.js'
// import morgan from 'morgan'
import bodyParser from 'body-parser'
import { initDb, Pokemon } from './src/db/sequelize.js'
import * as pokemonsRoutes from './src/routes/pokemons-routes.js'
import * as usersRoutes from './src/routes/users-routes.js'
import authMdlr from './src/auth/auth.js'
const app = express()
const port = 3000;
// body parsing
app.use(express.urlencoded({ extended: true }));
//app.use(morgan('combined'));
app.use(bodyParser.json())


//initDb()
// user routes 
usersRoutes.userLogin(app)
app.get('/', (req, res) => {
    var ipAddr = req.headers["x-forwarded-for"];
    if (ipAddr) {
        var list = ipAddr.split(",");
        ipAddr = list[list.length - 1];
    } else {
        ipAddr = req.connection.remoteAddress;
    }
    res.status(200).end(`bienvenue sur l'API Rest Cloud C student address ip de l'application sur heroku ${ipAddr}`)
})

app.use(authMdlr) 
// pokomons routes 
pokemonsRoutes.findAllPokemons(app)
pokemonsRoutes.findPokemonByPk(app)
pokemonsRoutes.createPokemon(app)
pokemonsRoutes.deletePokemon(app)
pokemonsRoutes.updatePokemon(app)

app.use((req ,res, next)=>{
const message = `la ressource demande ${req.url} nexiste pas `
res.status(404).json({message})
    next()
})


app.listen(port, () => console.log(`l'application est disponible sur http://localhost:$(port)`));