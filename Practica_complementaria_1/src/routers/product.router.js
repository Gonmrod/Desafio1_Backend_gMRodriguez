import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import __dirname from '../utils.js';

const router = Router();
const manager = new ProductManager(`${__dirname}/files/products.json`);

//se genera la Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    const {limit} = req.query;
    //Obtengo todos ls productos
    const products = await manager.getProducts();
    // y aplico límite si se especifica
    const limitedProducts = limit ? products.slice(0, Number(limit)) : products;
    
    res.send ({status: 'success', payload: limitedProducts});
});

// Se genera la ruta para obtener un producto por su ID
router.get('/:pid', async (req, res) =>{
    const productId = Number(req.params.pid);
    //Obtengo el producto por su ID
    const product = await manager.getProductById(productId);
    if(!product){
        return res.status(400).send({error: `Product ID: ${productId}, not exists.`});
    }else {
        res.send({status: 'success', payload: product});
    }
});

//Se genera la ruta para agregar un nuevo producto
router.post('/', async(req, res) =>{
    const product = await manager.addProduct(req.body);

    if(!product){
        return res.status(400).send({ error: `Product couldn't be added, check the info and try again.`});
    }else{
        res.send({status: 'success', payload: product});
    }
});

//Se genera la ruta para actualizar un producto por su ID
router.put('/:pid', async(req, res) => {
    const productId = Number(req.params.pid);
    const product = await manager.updateProduct({...req.body, id: productId});

    if(!product){
        return res.status(400).send({error: `Unable to find ID product: ${productId}`});
    }else{
        res.send({status: 'success', payload: product});
    }
});

//Se genera la ruta para eliminar un producto por su ID
router.delete('/:pid', async(req, res) =>{
    const productId = Number(req.params.pid);
    const product = await manager.deleteProduct(productId);

    if(!product) {
        return res.status(400).send({error: `Unable to find ID product: ${productId}` });
    }else{
        res.send({status: 'success', payload: product});
    }
});

export default router;