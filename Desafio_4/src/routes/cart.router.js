import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import CartManager from '../managers/CartManager.js';
import __dirname from '../utils.js';

const router = Router();
const manager = new CartManager(`${__dirname}/files/carts.json`);
const productManager = new ProductManager(`${__dirname}/files/products.json`);

//Se genera la ruta para crear un nuevo carrito
router.post('/', async(req, res) => {
    const cart = await manager.addNewCart();
    res.send({ status: 'success', payload: cart});
});

//Se genera la ruta para obtener los productos de un carrito
router.get('/:cid', async(req, res) => {
    const cartId = Number(req.params.cid);
    const cart = await manager.getCart(cartId);

    if(!cart){
        return res.status(400).send({ error: `Cart id: ${cartId}, not exists!`});
    }
    res.send({status: 'success', payload: cart});
});

// Se genera la ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);

    // Obtengo info del producto respecto a su id
    const product = await productManager.getProductById(productId)
    if(!product){
        return res.status(400).send({error: `Product ID ${productId}, not exists.`});
    }

    //Agrego el producto al carrito
    const cart = await manager.addProduct(cartId, productId);
    if(!cart) {
        return res.status(400).send({ error: `Unable to find id Cart: ${cartId}`});
    };
    res.send({status: 'success', payload: cart});
})

export default router;