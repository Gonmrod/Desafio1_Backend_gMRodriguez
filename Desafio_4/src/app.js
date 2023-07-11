import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routers/product.router.js';
import cartRouter from './routers/cart.router.js';
import viewsRouter from './routes/views.router.js'
import __dirname from './utils.js';
import { Server } from 'socket.io';

const app = express ();

app.use(express.json());

app.use(express.urlencoded ({extended: true}));
app.engine('handlebars', handlebars.engine());
app.set('views',) `${__dirname}/views`;
app.set('view engine', 'handlebars');

const server = app.listen(8080, ()=> console.log("Listening Port 8080"));

const io = new Server(server);

app.use((req, res, next) => {
    req.io = io
    return next();
})

app.use(express.static((`${__dirname}/public`)));
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/', viewsRouter);

