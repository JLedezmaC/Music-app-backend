const express = require('express');
const app = express();
const mongoose = require ('mongoose') // esto es para conectar mongodb
const userRoute = require('./routes/user.route') // esto es para llamar a uno de los routes osea rutas y se hace para decirle a app o express que la utilize  
require('dotenv').config(); // Esto hace que pueda cargar las variables de ambiente 
//Esto es para conectar la base de datos

// Primero le tenemos que decir la base de datos que vamos a conectar 
//    1- Vamos a la base de datos en robo3t y creamos la base de datos con el nombre que queramos
//    2- La url siempre es asi  mongodb://localhost/nombre de la base de datos 

// Esto de aqui abajo es para decirle que si no puede cargar las varibales de ambiente que me ponga las que estan por defecto 
const HOSTNAME = process.env.HOSTNAME || 'localHost'
const PORT = process.env.PORT || 3000
mongoose.connect(process.env.DATABASE_URL) // esto es para coenctar la base de datos 
const db = mongoose.connection; //se realiza la conexion a la base de datos



db.on('error',error=>{ // en este caso on es para eventos y lo que esta diciendo es que cuando sea un error dispare el evento on 
    console.log(error)
})
db.on('open',()=>{ // cuando la conexion este establecida o abierta que dispare este evento 
    console.log('conection to db establish')
})

// el use es para mediaworks que estos sirven para validar 

app.use(express.json()); // esto le dice a express que me traiga la informacion del body como un tipo json
app.use(express.urlencoded({ // esto sirve para reconocer cuando las request son string o arrays 
    type:'application/x-www-form-urlencoded', //son formatos ya establecidos
    extended:true,
}))


//router es como las rutas ejemplo  el /user, /playlist / artist /favorite songs 

app.use('/', userRoute); // estoy diciendo a express que utilize la ruta user 

app.use('*',(res,req) =>{ // el asterisco es como si no es un path de arriba como user haga lo que esta abajo
    res.status(404)
    res.send('Path cannot found')
})// esto es para decir que si no es userRoute que de un error 


app.listen(PORT,HOSTNAME,()=>{
    console.log(`server running on ${HOSTNAME}:${PORT}`)
})

// controladores son aquellos que nos permiten saber que es lo que va a entrar etc etc 

