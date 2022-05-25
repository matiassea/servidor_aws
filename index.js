const express = require('express');
const app = express();
app.use(express.json()); //middleware

//middleware, siempre va antes de las rutas.
//Morgan es 
function logger(req,res,next){
    console.log(`Route received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

//configuracion
app.all('/user',(req,res,next)=>{
    console.log('por aqui paso')
    next();
})
app.use(logger);


app.get('/user', (req,res) => {
res.json({
    username:"Gabiel",
    lastname:"Ael"

});
});

//Rutas dinamicas
app.post('/user/:id', (req,res) => {
    res.send('<h1>Post requested<h1>');
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

app.listen(3000,()=>{
    console.log('Server on port 3000')
});

//get, Put, post, Deleted