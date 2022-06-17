const express = require('express');
const app = express();
const fs = require('fs')

const json_books = fs.readFileSync('backup/operacion.json','utf-8');
var solicitudes = JSON.parse(json_books);

//Settings
app.set('appName','Aplicacion de robot');
app.set('port',3000);

//Middleware, siempre va antes de las rutas.
app.use(express.json()); 
//Morgan
function logger(req,res,next){
    console.log(`Route received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

//Configuracion
app.all('/user',(req,res,next)=>{
    console.log('por aqui paso y se fue')
    next();
})
app.use(logger);

//Route
app.get('/user', (req,res) => {
    res.send('<h1>Get requested<h1>');
//res.json({
//    username:"Gabiel",
//   lastname:"Ael"
//});
});

app.post('/user/:id', (req,res) => {
    res.send('<h1>Post requested<h1>');
    console.log(req.body); //para imprimir el json, cuerpo de la peticion, informacion
    console.log(req.params); //para ver la info enviada por el link, 
});

app.post('/robot/reporte-jira', (req,res) => {
    res.send('<h1>Informacion para robot Jira, procesaremos su requerimiento<h1>');
    const {desde,hasta} = req.body;
    if( !desde || !hasta ){
        res.status(400).send('Faltan datos');
        return;
    }
    let peticion = {
        desde,
        hasta
    }
    solicitudes.push(peticion)
    const json_robot = JSON.stringify(solicitudes)
    fs.writeFileSync('backup/operacion.json',json_robot,'utf-8');

    console.log(req.body); //para imprimir el json, cuerpo de la peticion, informacion
    console.log(req.params); //para ver la info enviada por el link, 
});

app.put('/user/:id', (req,res) => {
    res.send(`User ${req.params.id} updated`);
    console.log(req.body);
});

app.delete('/user/:userid', (req,res) => {
    res.send(`User ${req.params.userid} deleted`);
    console.log(req.params);
});

app.listen(app.get('port'),()=>{
    console.log(app.get('appName'));    
    console.log('Server on port',app.get('port'));
});
