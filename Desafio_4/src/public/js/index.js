const socket = io();

const allProducts = document.getElementById('allProducts')

socket.on('listado', data => {
    
    allProducts.innerHTML ="";
    
    data.products.forEach(prod => {
        const product = document.createElement("p");
        product.innerHTML= `<div class="CardItem" style="width: 18rem;">
        <h5> ${prod.title} </h5>
        <div class="cardBody">
            <h6> ${prod.description} </h6>
            <p>Código: ${prod.code} </p>
            <p>Precio: ${prod.price} </p>
            <p>Stock: ${prod.stock} </p>
        </div>
    </div>`
    allProducts.appendChild(product);
    });
});