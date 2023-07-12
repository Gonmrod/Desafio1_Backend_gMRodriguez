import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import __dirname from '../utils.js';

const router = Router();
const manager = new ProductManager(`${__dirname}/files/products.json`);

// Home sin socket
router.get('/', async (req, res) => {
  try {
    const products = await manager.getProducts();
    if (products) {
      res.render('home', {
        title: 'Home',
        products: products
      });
    } else {
      res.send('No se hallaron productos');
    }
  } catch (error) {
    console.log(error);
  }
});

// Actualización en tiempo real con sockets
router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await manager.getProducts();
    req.io.on('connection', async (socket) => {
      req.io.emit('listado', { products: products });
    });
    res.render('realTimeProducts', {
      title: 'realtimeproducts'
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
