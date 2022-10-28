import { Sequelize, DataTypes } from 'sequelize'
import { pokemon_model } from '../models/pokemon.js'
import { pokemons } from '../db/mock-pokemon.js'
import user_model from '../models/user.js'
import bcrypt, { hash } from 'bcrypt'

const sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        timezone: 'local',
    }, 
    logging: false
})

const Pokemon = pokemon_model(sequelize, DataTypes);
const User = user_model(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({ force: true })
        .then(_ => {
            console.log(`la synchro est en cours`)
            pokemons.map(pokemon => {
                Pokemon.create({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types.join()
                }).then(pokemon => console.log(pokemon.toJSON()))
            })

            //creation premier utilisateur
            bcrypt.hash('pikachu', 10).then(passwordHash => {

                return User.create({
                    username: 'pikachu',
                    password: passwordHash,
                })
                    .then(user => console.log(`l'utilisateur ${user.username} a bien été crée`))
            })
                .catch(error => console.error(`erreur lors de la création de l'utilisateur`))


        }).catch(error => console.error(`erreur lors de la synchro eurrer${error}`))
}

export { initDb, Pokemon, User }