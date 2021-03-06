const { optionsMDB } = require('./options/MariaDB.js')
const knexMDB = require('knex')(optionsMDB)


knexMDB.schema.createTable('products', table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('thumbnail').notNullable()
    table.integer('price')
}).then(()=>{
    console.log('table products created')
}).catch((err)=>{
    console.log(err)
    throw err
}).finally(()=>{
    knexMDB.destroy()
})

const { optionsSQ3 } = require('./options/SQLite3.js')
const knexSQ3 = require('knex')(optionsSQ3)

knexSQ3.schema.createTable('messages', table => {
    table.increments('id').primary()
    table.string('autor').notNullable()
    table.string('fyh').notNullable()
    table.string('msg')
}).then(() => {
    console.log('table products created sqlite')
}).catch((err) => {
    console.log(err)
    throw err
}).finally(() => {
    knexSQ3.destroy()
})