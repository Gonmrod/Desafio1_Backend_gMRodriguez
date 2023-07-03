import express from 'express';
import productsRouter from './routers/product.router.js';
import cartRouter from './routers/cart.router.js';
import __dirname from './utils.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

app.listen(8080, console.log('Listening on port 8080'));