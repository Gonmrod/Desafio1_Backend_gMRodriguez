import express from 'express';
import ProductManager, { listProducts } from './managers/ProductManager.js';

const manager = new ProductManager('./files/products.json');

// Utilizamos la función para agregar los productos al manager
const addProduct = async () => {
  // Uso un bucle for - of para recorrer la lista de productos
  for (const product of listProducts) {
    // Se agrega cada producto al manager
    await manager.addProduct(product);
  }
};

addProduct();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
  const { limit } = req.query;
  // ahora obtenemos todos los productos
  let products = await manager.getProducts();
  // limitamos la cantidad de productos
  if (limit) {
    products = products.slice(0, Number(limit));
  }
  res.send({ products });
});

app.get('/products/:pid', async (req, res) => {
  // Se obtiene el ID del producto de los parámetros de la ruta
  const productId = Number(req.params.pid);
  const product = manager.getProductById(productId);
  if (!product) {
    res.status(404).send({ error: 'Producto no encontrado' });
    return;
  }
  res.send(product);
});

app.listen(8080, () => console.log('Escuchando en el puerto 8080'));

