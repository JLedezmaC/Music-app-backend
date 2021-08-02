require('dotenv').config();
const express = require('express'); // manejador de solicitudes 
const mongoose = require('mongoose') // la db
const cors = require('cors'); // Para lograr hacer solicitudes sin problema de cors 
const userRoute = require('./routes/user.route') // rutas de usuarios 
const favoriteRoute = require('./routes/favorite.route'); // rutas de favoritas 
const recentRoute = require('./routes/recent.route'); // rutas de recientes 
const playlistRoute = require('./routes/playlist.route'); // rutas de playlists 



const app = express();

// Esto de aqui abajo es para decirle que si no puede cargar las varibales de ambiente que me ponga las que estan por defecto 

const HOSTNAME = process.env.HOSTNAME || 'localHost' // Esto es donde se va a ejecutar la db 
const PORT = process.env.PORT || 3000 // El puerto en el que se ejecuta 

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); // Para conectar la base de datos 
const db = mongoose.connection;
db.on('error', error => console.log(error)); // en este caso on es para eventos y lo que esta diciendo es que cuando sea un error dispare el evento on 
db.once('open', () => console.log('connection to db established')) // Esto es para que lo haga UNA sola vez 

app.use(express.json()); // Esto es para que use lo que se le solicita express 
app.use(express.urlencoded({
    type: 'application/x-www-form-urlencoded',
    extended: true,
}))
app.use(cors());
app.use('/', userRoute);      // Rutas por categoria  
app.use('/', favoriteRoute); // Rutas categoria 
app.use('/', recentRoute);  // Rutas categoria 
app.use('/', playlistRoute); // Rutas categoria 

app.use('*', (req, res) => { // Cualquier otra ruta que no sean las de arriba va a dar un error 
    res.status(404)
    res.send('Path cannot found')
})

app.listen(PORT, HOSTNAME, () => { // Esto es para decir en cual puerto esta escuchando los cambios 
    console.log(`server running on ${HOSTNAME}:${PORT}`)
})
