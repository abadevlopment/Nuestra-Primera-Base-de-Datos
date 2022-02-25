const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')


const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const { optionsMDB } = require('./options/MariaDB.js')
const knexMDB = require('knex')(optionsMDB)


// const Productos = require('./api/Productos.js')
// const productos = new Productos('products')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

io.on('connection', async (socket) => {
    console.log('Usuario conectado !!!!!!!!!')

    // PRODUCTOS
    socket.emit('productos',
        (knexMDB.from('products').select('*')
            .then((res) => {
                console.log(res)
                return res
            })
            .catch((err) => {
                console.log(err)
                throw err
            })
            .finally(() => {
                knexMDB.destroy()
            }))
    )

    socket.on('actualizar', producto => {
        knexMDB('products').insert(producto)
            .then(() => console.log('data inserted'))
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                knexMDB.destroy()
            })
        io.sockets.emit('productos',
            (knexMDB.from('products').select('*')
                .then((res) => {
                    console.log(res)
                    return res
                })
                .catch((err) => {
                    console.log(err)
                    throw err
                })
                .finally(() => {
                    knexMDB.destroy()
                }))
        )
    }
    )

    // socket.on('actualizar', async producto => {
    //     await productos.save(producto)
    //     io.sockets.emit('productos', await productos.getAll())
    // })
    // // MENSAJES
    // socket.emit('mensajes', await mensajes.getAll())

    // socket.on('mensajeNuevo', async mensaje => {
    //     mensaje.fyh = new Date().toLocaleString()
    //     await mensajes.save(mensaje)
    //     io.sockets.emit('mensajes', await mensajes.getAll())
    // })
})






const PORT = 8080 || process.env.PORT

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
