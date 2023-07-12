const socket = io();
const allProducts = document.getElementById('allProducts');

socket.on('listado', data => {
    allProducts.innerHTML = "";

    data.products.forEach(prod => {
        const product = document.createElement("div");
        product.className = "CardItem";
        product.style = "width: 18rem;";
        product.innerHTML = `
            <h5> ${prod.title} </h5>
            <div class="cardBody">
                <h6> ${prod.description} </h6>
                <p>Código: ${prod.code} </p>
                <p>Precio: ${prod.price} </p>
                <p>Stock: ${prod.stock} </p>
            </div>
        `;

        allProducts.appendChild(product);
    });
});

const formulario = document.querySelector('form');
formulario.addEventListener('submit', e => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const price = document.getElementById('price').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;

    const nuevoProducto = {
        title,
        description,
        thumbnail,
        price,
        code,
        stock
    };

    socket.emit('agregarProducto', nuevoProducto);

    formulario.reset();
});
