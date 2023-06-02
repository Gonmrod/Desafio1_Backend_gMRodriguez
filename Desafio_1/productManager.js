/* Se procede a crear la clase ProductManager
en donde en el método constructor se inicializan las propiedades: -products -productsId en el objeto this.products que es un arreglo que almacenerá los productos y productId es un contador que generará identificadores únicos para cada procuto.*/
class ProductManager {
    constructor() {
        this.products = [];
        this.productId = 1;
    }


//El método getProducts devuelve el arreglo products, que permitirá acceder a la lista de productos desde fuera de la clase.
    getProducts() {
        return this.products;
    }

/* El método addProduct agrega un nuevo producto al arreglo products, y se realizan algunas validaciones por medio de una condición con OR si alguno de los campos está vacío o es null, se muestra un mensaje y se detiene la ejecución */    
    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

/* En este caso se decidició usar el método .some en el arreglo de products para verificar si ya existe un producto con el mismo código (code). El método some verifica si existe un producto cuyo código sea igual al código del nuevo producto que se intenta agregar. De encontrarse un mismo código, se mostraría un mensaje de error y detendría la ejecución. */
        if (this.products.some(product => product.code === code)) {
            console.log("El código de producto ya existe");
            return;
        }


/* Creo el objeto product con las propiedades requeridas, incluído un identificador único (id) que se genera utilizando el contador productId++, para que el siguiente producto tengun un id único */        
        const product = {
            id: this.productId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

//Con el método push, el objeto product se agrega al arreglo products.
        this.products.push(product);
        console.log("El producto ha sido agregado correctamente.");
    }


/* El método getProductById busca un producto en el arreglo products utilizand el método .find que busca el primer elemento que cumple una condición especificada, aquí busca un producto cuyo id sea igual al valor dado por idProduct. Si no se encuentra el id especificado, se muestra un mensaje de error, caso contrario muestra un mensaje exitoso e imprime el objeto del producto */    
    getProductById(idProduct) {
        const product = this.products.find(product => product.id === idProduct);
        if (!product) {
            console.log("Producto no encontrado");
            return;
        }

        console.log("Producto encontrado:");
        console.log(product);
    }
}


/* Creo una instancia de clase por medio de new que crea un nuevo objeto manejadorProductos que tiene acceso a todos los métodos y propiedades de la clase ProductManager */
const manejadorProductos = new ProductManager();

// Llamo al método addProduct para agregar 3 productos distintos.
manejadorProductos.addProduct('Asado', 'Corte de carne vacuna', 2100, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHKS3hggGRWPpIK8Z9175qHIrC87abvRY6QH5SO7e5A5UM3XtQnHqtwmTidZsyJfPemhU&usqp=CAU', 'ARG001', 10);
manejadorProductos.addProduct('Empanadas', 'Empanadas de carne', 300, 'https://assets.unileversolutions.com/recipes-v2/239857.jpg', 'ARG002', 50);
manejadorProductos.addProduct('Dulce de Leche', 'Colonial', 1990, 'https://cdn.shopify.com/s/files/1/0490/7053/8901/products/diadeldulcedelecheportada_c9abc65a-0505-4523-97c4-4ae399eb341e_600x.jpg?v=1651685380', 'ARG003', 20);


// Llamo al método getProductById para buscar productos en el arreglo products según sus id
manejadorProductos.getProductById(1);
manejadorProductos.getProductById(2);
manejadorProductos.getProductById(3);


//Finalmente, con el método getProducts obtengo el arreglo completo y lo imprimo.
console.log(manejadorProductos.getProducts());