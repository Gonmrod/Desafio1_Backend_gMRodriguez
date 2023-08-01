import express from "express";
import { connect } from "mongoose";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import indexRouter from "./router/index.js";

const PORT = 8080;
const ready = ()=>{
    console.log("Listening on PORT " + PORT);
    connect('mongodb+srv://gmrodriguez:Test1234@cluster0.iuz7uhb.mongodb.net/ecommerce')
    .then(() => console.log('Database connected.'))
    .catch(err => console.log(err));
}

const app = express()

//Middlewares

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Router
app.use('/api', indexRouter);
app.use(errorHandler);
app.use(notFoundHandler);


app.listen(PORT, ready);