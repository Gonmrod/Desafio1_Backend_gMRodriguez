import ProductManager from "./managers/ProductManager2.js";

const prodMgr = new ProductManager('./files/products.json');

let data = {
    title: "Vacio",
    description: "Corte de Carne Vacuna",
    price: 2300,
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3x-XeUZ_XdwAW2G8Tdhz7_9g1fbld1-gs_q-3vHYa&s",
    code: "ARG001",
    stock: 50,
  };


/* Evuelvo todo el código en una función asíncrona autoinvocada async () => {......} para poder utilizar el operador await dentro de esta. */
  (async () => {
    const prod = await prodMgr.addProduct(data); 
    console.log("Producto Agregado", JSON.stringify(await prodMgr.getProducts()));
  
    await prodMgr.updateProduct({ ...prod, stock: 60 });
    console.log("Dato actualizado", JSON.stringify(await prodMgr.getProducts()));
  
    await prodMgr.removeProduct(prod.id);
    console.log("Producto eliminado", JSON.stringify(await prodMgr.getProducts()));

  })();