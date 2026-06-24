const API_URL = 'http://127.0.0.1:8000/mates/'
const productContainer = document.getElementById('product-container');
const cartContainer = document.getElementById('cart-container');
const crudContainer =document.getElementById('crud-container');
const itemsCart = document.getElementById("items-cart");
const btnCart = document.getElementById('btn-cart');
const btnCrud = document.getElementById('btn-crud');
const hero = document.getElementById('hero');
let itemsCount = localStorage.getItem('itemsCount') ? parseInt(localStorage.getItem('itemsCount')) : 0;
let listaProductos = [];
let listaCarrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

if (itemsCart) {
  itemsCart.innerText = itemsCount;
}


const getProducts = async () => {

  const respuesta = await fetch(API_URL);
  const respuestaJson = await respuesta.json();
  const datos = respuestaJson;
  listaProductos = datos;
  const botonObtener = document.getElementById("obtener-datos");
  botonObtener.addEventListener("click", ()=>{
    document.getElementById("pantalla").textContent = JSON.stringify(datos, null, 2);
  });

  renderProducts(listaProductos);
  btnCrud.addEventListener('click', () => {
      hero.classList.add('hidden');
      productContainer.classList.add('hidden'); 
      cartContainer.classList.add('hidden'); 
      crudContainer.classList.remove('hidden');
      crudContainer.classList.add('flex');
  });
 
  btnCart.addEventListener("click", () => { 
    hero.classList.add('hidden');
    productContainer.classList.add('hidden');
    crudContainer.classList.remove('flex'); 
    crudContainer.classList.add('hidden');
    cartContainer.classList.add('md:grid','md:grid-cols-2','md:gap-10','w-screen','md:mx-auto','md:px-40','md:my-20'); 

    if(listaCarrito == 0){
      cartContainer.innerHTML = `
      <div class="md:mx-auto md:my-auto">
        <p class="text-sm mt-2 text-center text-black">Tu carrito está vacío</p>
      </div>
      `;
    }else{
    renderCart(listaCarrito);
    }
  });
};

getProducts();


const renderProducts = (productos) => {

  const cardHTML = productos.map((p) => {
      return `
        <article class="mx-6 md:mx-1 md:overflow-hidden">
          <div class="h-50 overflow-hidden md:h-auto">
            <img class="h-auto w-full object-cover" src="${p.image}" alt="${p.nombre ? p.nombre : p.name}">
          </div>
          <div class="flex flex-col items-center my-2 w-full md:px-1">
            <p class="nav-links text-sm w-full text-center md:w-auto">${p.nombre ? p.nombre : p.name}</p> <!-- Nombre del producto -->
            <p class="nav-links text-sm mt-1 md:text-center">$${p.precio}</p> <!-- Etiqueta de precio -->
            <div class="flex items-center gap-2">
              <button data-id="${p.id}" type="button" class="nav-links underline cursor-pointer add-cart">Comprar</button>
              <img class="h-4 w-4" src="img/bag-3-svgrepo-com.svg" alt="">
            </div>
          </div>
        </article>
      `;
    }).join(''); 
    
  productContainer.innerHTML = cardHTML;
 
  botonComprar();
};

const botonComprar = () => {
  const botonesComprar = document.querySelectorAll('.add-cart');
  botonesComprar.forEach(boton => {
    boton.addEventListener('click', (e) => {

      const productoId = e.currentTarget.dataset.id;
      addToCart(productoId);
    });
  });
}

const addToCart = (productoId) => {

  const producto = listaProductos.find(p => p.id == productoId);

  if (producto) {

    listaCarrito.push(producto);

    itemsCount++;

    itemsCart.innerText = itemsCount;

    localStorage.setItem('carrito', JSON.stringify(listaCarrito));

    localStorage.setItem('itemsCount', itemsCount.toString());
  }
}

const renderCart = (listaCarrito) => {

    const productsCart = listaCarrito.map((p) => {
      return `
        <article class="flex flex-row items-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 mx-4 md:mx-0 my-2">
          <div class="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 bg-gray-50">
            <img class="w-full h-full object-cover" src="${p.image}" alt="${p.nombre ? p.nombre : p.name}">
          </div>
          <div class="flex flex-col justify-center flex-grow p-4 overflow-hidden">
            <p class="text-gray-800 font-bold text-sm md:text-base truncate w-full" title="${p.nombre ? p.nombre : p.name}">${p.nombre ? p.nombre : p.name}</p>
            <p class="text-green-600 font-extrabold mt-1 text-base md:text-lg">$${p.precio}</p>
          </div>
          <div class="pr-4 pl-2 border-l border-gray-100 flex items-center h-full">
            
            <button data-id="${p.id}" type="button" class="remove-product cursor-pointer text-red-500 hover:text-white bg-red-50 hover:bg-red-500 p-2 md:px-4 md:py-2 md:rounded-lg rounded-full transition-colors duration-300 flex items-center justify-center gap-2 group" title="Eliminar">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span class="hidden md:inline font-medium text-sm">Eliminar</span>
            </button>
          </div>
        </article>
      `;
      }).join(''); 
      
    
    cartContainer.innerHTML = productsCart;
   
    botonEliminar(listaCarrito)
}
 

const botonEliminar = (listaCarrito) => {
  
  const botonesEliminar = document.querySelectorAll('.remove-product');
 
  botonesEliminar.forEach(boton => {
   
    boton.addEventListener('click', (e) => {
      
      const productoId = e.currentTarget.getAttribute('data-id');
      
      deleteProductCart(productoId, listaCarrito);
    });
  });
}


const deleteProductCart = (productoId, listaCarrito) => {

  const producto = listaCarrito.find(p => p.id == productoId);
  if (producto) {
    
    listaCarrito.splice(listaCarrito.indexOf(producto), 1);
    
    itemsCount--;
    
    itemsCart.innerText = itemsCount;
    
    localStorage.setItem('carrito', JSON.stringify(listaCarrito));
    
    localStorage.setItem('itemsCount', itemsCount.toString());
   
    renderCart(listaCarrito); 
  }
}

async function crearArticulo(nuevoArticulo) {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoArticulo)
    });

    const datos = await respuesta.json();
    console.log("respuesta POST: ", datos)
    alert("El producto " + datos.nombre + " se ha creado correctamente")
    

  } catch (error) {
    console.error("Error al crear artículo:", error);
  }
}
const formularioCrear = document.getElementById("form-crear");

formularioCrear.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let nuevoId = listaProductos.length > 0 ? Math.max(...listaProductos.map(p => p.id)) + 1 : 1;

  const datosFormulario = {
    id: nuevoId,
    image: document.getElementById("imagen").value,
    nombre: document.getElementById("nombre").value,
    material: document.getElementById("material").value,
    precio: parseFloat(document.getElementById("precio").value),
    stock: parseInt(document.getElementById("stock").value),
  }
  crearArticulo(datosFormulario)
})

async function editarArticulo(nuevoArticulo, id) {
  try {
    const respuesta = await fetch(`${API_URL}${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoArticulo)
    });

    const datos = await respuesta.json();
    console.log("respuesta PUT: ", datos)

  } catch (error) {
    console.error("Error al editar artículo:", error);
  }
}

async function borrarArticulo(id) {
  try {
    const respuesta = await fetch(`${API_URL}${id}/`, {
      method: "DELETE"
    });

    const datos = await respuesta.json();
    console.log("respuesta DELETE: ", datos)

  } catch (error) {
    console.error("Error al borrar artículo:", error);
  }
}


async function buscarPorId() {
  const id = document.getElementById("buscar-id").value;
  if (!id) { alert("Por favor ingresa un ID"); return; }
 
  try {
    const respuesta = await fetch(`${API_URL}${id}/`);
    const articulo = await respuesta.json();
    if(articulo.id == listaProductos.id) { alert("Id no encontrado"); return; }
    document.getElementById("edit-imagen").value = articulo.image;
    document.getElementById("edit-nombre").value = articulo.nombre;
    document.getElementById("edit-material").value = articulo.material;
    document.getElementById("edit-precio").value = articulo.precio;
    document.getElementById("edit-stock").value = articulo.stock;
    document.getElementById("edit-id").value = articulo.id;

  } catch (error) {
    console.error("Error al buscar artículo por ID:", error);
  }
}


function borrarDesdeBusqueda() {
  const id = document.getElementById("buscar-id").value;
  if (!id) { alert("Por favor ingresa un ID para borrar"); return; }
  
  if (confirm(`¿Estás seguro de que quieres borrar el artículo con ID ${id}?`)) {
    borrarArticulo(id)
  }
}


const formularioEditar = document.getElementById("form-editar");

formularioEditar.addEventListener("submit", (e) => {
  e.preventDefault()

  const id = parseInt(document.getElementById("edit-id").value);

  const datosFormulario = {
    image: document.getElementById("edit-imagen").value,
    nombre: document.getElementById("edit-nombre").value,
    material: document.getElementById("edit-material").value,
    precio: parseFloat(document.getElementById("edit-precio").value),
    stock: parseInt(document.getElementById("edit-stock").value),
    
  }

  editarArticulo(datosFormulario, id)

})