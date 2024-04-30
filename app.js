const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const handlebars = require('express-handlebars');
const port = 9090;
const sessionsRouter = require("./src/routes/sessions.router")
const viewsRouter = require("./src/routes/views.router")
const passport = require('passport')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');

const config = require('./src/config');

mongoose.connect(config.dbConnectionString);


const app = express();

mongoose.connect(`mongodb+srv://fidelnadai1:639418@coderhouse.3c4pmor.mongodb.net/`).then(()=>{
    console.log('Success on connection')
})

app.use(session({
    secret:'ourNewSecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://fidelnadai1:639418@coderhouse.3c4pmor.mongodb.net/`,
        ttl: 3600
    })
}))

app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');


app.use('api/sessions', sessionsRouter)
app.use('/', viewsRouter);


app.listen(port, ()=>console.log(`up and running on port ${port}`))