import express from 'express';
import exphbs from 'express-handlebars';
import productsRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', exphbs());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use((req, res, next) => {
    req.io = io;
    return next();
});
app.use('/', viewsRouter);
app.use(express.static(`${__dirname}/public`));
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

const server = app.listen(8080, () => console.log("Listening on port 8080"));

const io = new Server(server);

io.on('connection', socket => {
    console.log('Cliente conectado.');
});
