const productos = [
    { nombre: "Mouse", precio: 1000 },
    { nombre: "Teclado", precio: 2000 },
    { nombre: "Monitor", precio: 3000 }
];
const btn = document.querySelector("#btn");
const masCaros = document.querySelector("#mostrar");
const app = document.querySelector("#app");

btn.addEventListener('click',()=>{
    console.log('hola')
    productos.forEach((producto) => {
        const elemento  = document.createElement('h2')
        elemento.textContent = producto.nombre + '-' + producto.precio
        app.appendChild(elemento)
    });
  
})

masCaros.addEventListener('click',() =>{
     const caros = productos.filter((producto) => {
         return producto.precio > 1500;
    });
    caros.forEach((producto) => {

        const elemento = document.createElement("h2");

        elemento.textContent = producto.nombre + producto.precio

        app.appendChild(elemento);

        });
})