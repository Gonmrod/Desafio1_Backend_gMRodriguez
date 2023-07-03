import fs from 'fs';
import __dirname from '../utils.js';

class CartManager {
    constructor(path){
    this.path = path
    }


    //Creo el método para agregar un nuevo cart
    addNewCart =  async() => {
        try{
            if(fs.existsSync(this.path)){
                // Se lee el archivo y parsea los carritos existentes
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const carts = JSON.parse(data);

                // Se obtiene el último carrito y genera un nuevo id.        
                const id = carts[carts.lenght -1].id + 1;
                const cart = {id: id, products: []}
                carts.push(cart);

                //ahora se escribien los carritos actualizados en el archivo.
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
                return cart;
            }else {
                //Si no existe el archivo, entonces crea un nuevo carrito con id 1
                const cart = {id: 1, products: []};
                const carts = [cart];
                // Y escribo los carritos en el archivo
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
                return cart;
            }
        } catch(error){
            console.log(error);
        }
    }

// Ahora creo el método para obtener los productos de un carrito
getCart = async (id) => {
    try {
        //Se lle el archivo y se parsean los carritos exsitentes
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(data);

        //Busco el carrito por su ID
        const cartIndex = carts.findIndex( c => c.id === id);

        //Le agrego una validación, si no encuentra el carrito retorna un null
        if(cartIndex === -1){
            return null;
        }

        // Si los encuentra retorna los productos del carrito encontrado
        return carts[cartIndex].products;
    } catch(error){
        console.log(error);
    }
};

// Creo el método para agregar un producto a carrito
addProduct = async(cid, pid) => {
    try {
        //Nuevamente se lee el archivo y se parsean los carritos existentes
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(data);
        //Busco el carrito por su ID
        const cartIndex = carts.findIndex( c => c.id === cid);

        if(cartIndex === -1){
            return null
        }

        const cart = carts[cartIndex].products;

        //Busco un producto idéntico en el carrito
        let identicalProduct = cart.find( p => p.product === pid);
        
        if(!identicalProduct) {
            // Si no existe un producto idéntico, agrego uno nevo con cantidad 1
            cart.push({product: pid, quantity: 1});

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            return cart;

        }else {
            // Si hay un producto idéntico, incrementa la cantidad en 1
            const cartIndex = cart.findIndex( p => p.product === pid);
            cart[cartIndex].quantity +=1;
        }

        // Ahora que termina la validación, escribo los carritos actualizados en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

        return cart;
    } catch(error) {
        console.log(error)
    }
  };
}

export default CartManager;

