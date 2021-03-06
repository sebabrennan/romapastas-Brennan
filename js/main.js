
const miCarrito = new Carrito ([]);

cargarProductos();
mostrarCarrito();
mostrarTotalCarrito();
programarBotonesCarrito();


function cargarProductos() {
    return fetch("http://localhost:3000/productos")
       .then((response) => response.json())
       .then((json) => mostrarProductos(json))
       .catch(() => alert("intente de nuevo"))
}

function mostrarProductos(productos)
{
    productos.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("card", "cardCarrito")
        div.innerHTML=`
                        <img src='${element.imagen}'/>
                        <p>${element.nombre}</p>
                        <p>$${element.precio}<p>`

        const btn = document.createElement('button')
        btn.classList.add("btn","btnCarrito")
        btn.innerText="Agregar producto"
        btn.addEventListener('click', ()=>{
            const productoParaCarrito = {
                ...element, 
                cantidad:1,
            }

            miCarrito.agregarProducto(productoParaCarrito);
            mostrarCarrito();
            console.log("Carrito", miCarrito);

            Toastify({
                text: "Producto agregado exitosamente", 
                duration: 3000,
                style: {
                    background: 'green'
                 },
             }).showToast();
        })

        div.appendChild(btn);
        
        const nodo = document.getElementById("productosCarrito")

        nodo.appendChild(div);
    });
}

function mostrarCarrito()
{
    const divCarrito = document.getElementById("carrito");
    divCarrito.innerHTML="";
    miCarrito.productos.forEach(element=>{
        const div = document.createElement("div");
        div.classList.add("card","cardMiniCarrito")
        div.innerHTML=`
            <img src='${element.imagen}' width="150px"/><br/>
            ${element.nombre}<br/>
            $${element.precio*element.cantidad}<br/>
            Cantidad: ${element.cantidad}
        `
        
        const btnBorrar = document.createElement('button')
        btnBorrar.classList.add("btn", "btnVaciarCarrito")
        btnBorrar.innerHTML="borrar producto"
        btnBorrar.addEventListener('click', 
        ()=>{
            borrarProducto(element);

            Toastify({
                text: "Producto borrado", 
                duration: 3000,
                style: {
                    background: 'red'
                 },
             }).showToast();
        })
        div.appendChild(btnBorrar);

        divCarrito.appendChild(div)

    })

    mostrarTotalCarrito();
}

function mostrarTotalCarrito()
{
     const divTotal = document.getElementById("totalCarrito");
     divTotal.innerHTML="";
     total = miCarrito.calcularTotal();
     
    divTotal.innerHTML="TOTAL: $"+total.toFixed(2);

}

function programarBotonesCarrito()
{
    programarVaciarCarrito();
}

function programarVaciarCarrito()
{
    const btn = document.getElementById('vaciarCarrito')
    btn.addEventListener('click', ()=>{
        miCarrito.vaciarCarrito();
        mostrarCarrito();
    })
}

function borrarProducto(producto)
{
    miCarrito.borrarProducto(producto);
    mostrarCarrito();
}
