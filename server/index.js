import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'



const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors:{
    origin:'*',
    methods: ['GET', 'POST']
  },
  connectionStateRecovery: {}
})


io.on('connection', async (socket) => {
  console.log('a user has connected!')

  socket.on('disconnect', () => {
    console.log('an user has disconnected')
  })

  socket.on('sensor_data', (msg) => {
    console.log("Estamos imprimiendo el mensaje que llega de la rasp")
    console.log(msg)
    let hola = "Hola desde el sevidor"
    //Mandando el mensaje a todos los usurios conectados
    io.emit('sensor_data_front', msg)

  })

})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.send(`<h1> Hola este es el server</h1>`)
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})