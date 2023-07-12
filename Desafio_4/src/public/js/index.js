const socket = io();

const fila = document.getElementById('fila')

socket.on('listado', data => {
    
    let productos = ''
    
    data.products.forEach(prod => {
        productos +=
        `<div class="CardItem" style="width: 18rem;">
        <h5> ${prod.title} </h5>
        <div class="cardBody">
            <h6> ${prod.description} </h6>
            <p>Código: ${prod.code} </p>
            <p>Precio: ${prod.price} </p>
            <p>Stock: ${prod.stock} </p>
        </div>
    </div>`
    });
    fila.innerHTML = productos;
});