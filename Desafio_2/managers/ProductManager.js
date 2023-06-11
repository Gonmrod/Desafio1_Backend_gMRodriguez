import fs from 'fs/promises';

export default class ProductManager {
    constructor(path){
        this.path = path;
        this.products = [];
        this.productId = 1;
    }

    //Con el siguiente bloque se crea un archivo con los productos en formato JSON

    async createFileWithProducts(products) {
        try{
            await fs.writeFile(this.path, JSON.stringify(products, null, "\t"), "utf-8");
        }catch (error){
            console.error(error);
        }
    }

    //Con el método addProduct agregamos un neuvo producto

    async addProduct(product) {
        const presentProducts = await this. getProducts();

        //Creo una constante missingFields para verificar si faltan campos por llenar, usando la función filter.

        const missingFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'].filter(field => !product[field]);

        if( missingFields.length > 0) {
            console.log ("Todos los campos son obligatorios");
            return;
        }

        //Creo la variable duplicateProduct para saber si ya existe un producto con el mismo código

        const duplicateProduct = presentProducts.find(p => p.code === product.code);
        if( duplicateProduct ) {
            console.log("El código de producto ya existe");
            return;
        }

        //Con productId (que ya fue declarado en el constructor) asgino un nuevo ID al producto -- Utilizo un ternario

        const productId = presentProducts.length > 0 ? presentProducts[presentProducts.length -1].id + 1 : 1;

        const newProduct = { ...product, id: productId };

        this.products.push(newProduct);
        await this.createFileWithProducts(this.products);

        return newProduct;
    }

    /* Creo el método  getProducts para obtener todos los productos del archivo */

    async getProducts() {
        try{
            const fileContent = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(fileContent);
        }catch (error) {
            console.error(error);
            return [];
        }
    }


    /* El método getProductById como vimos en el Desafío 1 obtiene un producto por su ID */

    getProductById(idProduct) {
        const product = this.products.find(p => p.id === idProduct);
        if (!product){
            console.log("Producto no encontrado");
            return;
        }

        console.log("Producto encontrado.");
        console.log(product);
    }

    /*Ahora creamos el método updateProduct para actualizar un producto ya existente. */

    async updateProduct(updatedProduct) {
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === updatedProduct.id);

        if (productIndex === -1) {
            console.error("No se puede encontrar el producto que desea actualizar.");
            return;
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
            console.error("No se puede encontrar el producto que desea eliminar");
            return;
        }

        products.splice(productIndex, 1);
        await this.createFileWithProducts(products);

        return products;
    }
}