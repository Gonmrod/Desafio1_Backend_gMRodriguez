import express from 'express';
import exphbs from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import ProductManager from './managers/ProductManager.js';

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

const server = app.listen(8080, () => console.log("Listening on port 8080"));

const io = new Server(server);
const productmanager = new ProductManager(`${__dirname}/files/products.json`);

io.on('connection', socket => {
    console.log('Cliente conectado.');
    socket.on('agregarProducto', async nuevoProducto =>{
        const productoAgregado = await productmanager.addProduct(nuevoProducto);
        if(productoAgregado){
            const products = await productmanager.getProducts();
            io.emit('listado', {products});

        } else {
            console.log('No se puede agregar el producto')
        }
    })
});
