//arrancado de servidor
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(morgan('dev')); //ver por consola los http req
app.use(express.json());

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use(require('./routes/task.routes'));

//Starting Server
app.listen(app.get('port'), () => {
    console.log('te escucho en puerto', app.get('port'));
});

