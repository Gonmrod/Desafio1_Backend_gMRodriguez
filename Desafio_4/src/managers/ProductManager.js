import fs from 'fs/promises';

class ProductManager {
    constructor(path){
        this.path = path;
        this.products = [];
        this.productId = 1;
    }

    async createFileWithProducts(products) {
        try {
          await fs.writeFile(this.path, JSON.stringify(products, null, '\t'), 'utf-8');
        } catch (error) {
          console.error(error);
        }
      }

    //Con el método addProduct agregamos un neuvo producto

    async addProduct(product) {
        const presentProducts = await this.getProducts();
    
        //Creo una constante missingFields para verificar si faltan campos por llenar, usando la función filter.

        const missingFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'].filter(
            field => !product[field]);
      
          if (missingFields.length > 0) {
            console.log('Todos los campos son obligatorios');
            return;
          }
        //Creo la variable duplicateProduct para saber si ya existe un producto con el mismo código

        const duplicateProduct = presentProducts.find(p => p.code === product.code);
            if (duplicateProduct) {
            console.log('El código de producto ya existe');
            return;
            }

        //Con productId (que ya fue declarado en el constructor) asgino un nuevo ID al producto -- Utilizo un ternario

        const productId = presentProducts.length > 0 ? presentProducts[presentProducts.length - 1].id + 1 : 1;

        const newProduct = { ...product, id: productId };
    
        this.products.push(newProduct);
        await this.createFileWithProducts(this.products);
    
        return newProduct;
      }

    /* Creo el método  getProducts para obtener todos los productos del archivo */

    async getProducts() {
        try {
          const fileContent = await fs.readFile(this.path, 'utf-8');
          this.products = JSON.parse(fileContent);
          return this.products;
        } catch (error) {
          console.error(error);
          return [];
        }
      }


    /* El método getProductById como vimos en el Desafío 1 obtiene un producto por su ID */

    getProductById(idProduct) {
        const product = this.products.find(p => p.id === idProduct);
        if (!product) {
          console.log('Producto no encontrado');
          return null;
        }
    
        console.log('Producto encontrado.');
        console.log(product);
        return product;
      }

    /*Ahora creamos el método updateProduct para actualizar un producto ya existente. */

    async updateProduct(updatedProduct) {
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === updatedProduct.id);
    
        if (productIndex === -1) {
          console.error('No se puede encontrar el producto que desea actualizar.');
          return null;
        }
    
        products[productIndex] = updatedProduct;
        await this.createFileWithProducts(products);
    
        return updatedProduct;
      }
    

    /* Por último creamos el método removeProduct para eliminar un producto por su id */

    async removeProduct(id) {
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === id);
    
        if (productIndex === -1) {
          console.error('No se puede encontrar el producto que desea eliminar');
          return null;
        }
    
        products.splice(productIndex, 1);
        await this.createFileWithProducts(products);
    
        return products;
      }
    }

export const listProducts = [
    {
        "title": "Mate",
        "description": "Mate argentino tradicional",
        "price": 500,
        "thumbnail": "url de la imagen",
        "code": "000001",
        "stock": 100,
        "id": 1
      },
      {
        "title": "Asado",
        "description": "Corte de carne argentino para parrilla",
        "price": 1500,
        "thumbnail": "url de la imagen",
        "code": "000002",
        "stock": 50,
        "id": 2
      },
      {
        "title": "Dulce de Leche",
        "description": "Clásico dulce de leche argentino",
        "price": 200,
        "thumbnail": "url de la imagen",
        "code": "000003",
        "stock": 200,
        "id": 3
      },
      {
        "title": "Empanadas",
        "description": "Empanadas argentinas de carne",
        "price": 80,
        "thumbnail": "url de la imagen",
        "code": "000004",
        "stock": 80,
        "id": 4
      },
      {
        "title": "Alfajores",
        "description": "Alfajores argentinos de dulce de leche",
        "price": 50,
        "thumbnail": "url de la imagen",
        "code": "000005",
        "stock": 150,
        "id": 5
      },
      {
        "title": "Malbec",
        "description": "Vino tinto argentino Malbec",
        "price": 800,
        "thumbnail": "url de la imagen",
        "code": "000006",
        "stock": 100,
        "id": 6
      },
      {
        "title": "Chimichurri",
        "description": "Salsa argentina para acompañar asados",
        "price": 150,
        "thumbnail": "url de la imagen",
        "code": "000007",
        "stock": 50,
        "id": 7
      },
      {
        "title": "Provoleta",
        "description": "Queso provolone a la parrilla",
        "price": 300,
        "thumbnail": "url de la imagen",
        "code": "000008",
        "stock": 40,
        "id": 8
      },
      {
        "title": "Ñoquis",
        "description": "Plato de ñoquis caseros",
        "price": 120,
        "thumbnail": "url de la imagen",
        "code": "000009",
        "stock": 60,
        "id": 9
      },
      {
        "title": "Medialunas",
        "description": "Medialunas argentinas de manteca",
        "price": 80,
        "thumbnail": "url de la imagen",
        "code": "000010",
        "stock": 100,
        "id": 10
      }
]

export default ProductManager;