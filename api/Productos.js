const { optionsMDB } = require('../options/MariaDB.js')
const knex = require('knex')(optionsMDB)

const product = [
    {title: 'asd', thumbnail: 'https://res.cloudinary.com/dvinxey2w/image/upload/v1642719248/ABA/ICONS%2032PX/config-75_nf1q9y.svg', price: 100},
    {title: 'asd', thumbnail: 'https://res.cloudinary.com/dvinxey2w/image/upload/v1642719248/ABA/ICONS%2032PX/config-75_nf1q9y.svg', price: 100},
    {title: 'asd', thumbnail: 'https://res.cloudinary.com/dvinxey2w/image/upload/v1642719248/ABA/ICONS%2032PX/config-75_nf1q9y.svg', price: 100},
]

knex('products').insert(product)
            .then(() => console.log('data inserted'))
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                knex.destroy()
            })

// class Productos {
//     constructor(table) {
//         this.table = table
//     }

//     getAll() {
//         knex.from(this.table).select('*')
//             .then((res) => {
//                 console.log(res)
//                 return res
//             })
//             .catch((err) => {
//                 console.log(err)
//                 throw err
//             })
//             .finally(() => {
//                 knex.destroy()
//             })
//     }

//     save(product) {
//         knex(this.table).insert(product)
//             .then(() => console.log('data inserted'))
//             .catch((err) => { console.log(err); throw err })
//             .finally(() => {
//                 knex.destroy()
//             })
//     }
// }

// module.exports = Productos