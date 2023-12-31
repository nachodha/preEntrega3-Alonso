//ACA LAS FUNCIONES DEL FORMULARIO
let form1 = document.getElementById(`form1`)
    let form2 = document.getElementById(`form2`)
    let form3 = document.getElementById(`form3`)

    let next1 = document.getElementById(`next1`)
    let next2 = document.getElementById(`next2`)
    
    let volver1 = document.getElementById(`volver1`)
    let volver2 = document.getElementById(`volver2`)

    let progress = document.getElementById(`progress`)

    next1.onclick = function (){
        console.log(`click`)
        form1.style.left = "-450px";  
        form2.style.left = "40px"; 
        progress.style.width = "240px"
    }
    volver1.onclick = function (){
        console.log(`click`)
        form1.style.left = "40px";  
        form2.style.left = "450px"; 
        progress.style.width = "120px"
    }
    next2.onclick = function (){
        console.log(`click`)
        form2.style.left = "-450px";  
        form3.style.left = "40px"; 
        progress.style.width = "360px"
    }
    volver2.onclick = function (){
        console.log(`click`)
        form2.style.left = "40px";  
        form3.style.left = "450px"; 
        progress.style.width = "240px"
    }

//ACA VA LA CAPTURA DE CATOS
let idProducto = 0

let contenido = document.getElementById(`contenido`) //ok
let formulario = document.getElementById(`formulario`) //ok
let actualizar = document.getElementById(`boton-actualizar`) //OK
/*let productosTienda = document.getElementById(`productos-tienda`) NO UTILIZADO, PARECE DEL MARKETPLACE */
let borrarTienda = document.getElementById(`boton-reinicio`) //OK
/*let buscadorImagen = document.getElementById(`inputBuscador`) NO UTILIZADO*/
let searchBtn = document.getElementById(`searchBtn`) //OK
let producto = document.getElementById(`producto`) //ok
let arrayProductos = []

//EVENTO PARA BUSCAR IMAGEN EN LA WEB AL CLICKEAR EL BOTON
searchBtn.addEventListener((`click`),()=>{
    let busqueda = producto.value.replace(/ /g,"+")
    let url = `https://www.elektracomics.com.ar/search/?q=`+busqueda
    console.log(url)
    console.log(producto.value)
    const ventana = window.open(
        url,
        'popUpWindow','height=700,width=800,left=500,top=200,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
        )
        if(!ventana || ventana.closed || typeof ventana.closed=='undefined') 
        { 
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ventana emergente bloqueada',
              })
        }
})
//FUNCIONES
function varciarArray (array){
    console.log(`se esta borrando el array`+ array)
    return array.length = 0
}

//CONSTRUCTOR

class productos {
    constructor (nombre, precio, imagen, productoId) {
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
        this.productoId = productoId
    }
 }

 //ESTE EVENTO ALMACENA LOS PRODUCTOS QUE VAN A IR A LA TIENDA EN EL STORAGE. PERO SI YA EXISTE UN ARRAY GUARDADO, LO RECUPERA, LO FUSIONA CON EL QUE SE ESTA CREANDO Y LO DEVUELVE AL STORAGE
 borrarTienda.addEventListener (`click`,()=>{
    Swal.fire({
        title: 'Estas segur@?',
        text: "Estas por borrar todos los productos de la tienda.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borralos'
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear()
            Swal.fire(
            'Productos borrados!',
            'La tienda ahora esta vacia',
            'success'
          )
        }
      })
})
actualizar.addEventListener(`click`,()=>{
if (arrayProductos.length == 0){
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No hay productos agregados',
        showConfirmButton: false,
        timer: 1500
      })
} else if(localStorage.getItem(`productos`)=== null){
localStorage.setItem(`productos`, JSON.stringify(arrayProductos),
console.log(arrayProductos))
Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tienda actualizada',
        showConfirmButton: false,
        timer: 1500
  })
}
else {
const arrayRecuperado = JSON.parse(localStorage.getItem('productos'))
arrayProductos.reverse()
const arrayNuevo = arrayProductos.concat(arrayRecuperado)
localStorage.setItem(`productos`, JSON.stringify(arrayNuevo))
console.log(arrayProductos)
/*arrayProductos.forEach((el)=>{
let i = arrayProductos.indexOf(el)
arrayProductos.splice(i,1)
})*/Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Tienda actualizada',
    showConfirmButton: false,
    timer: 1500
  })}
while (listador.firstChild) {
    listador.removeChild(listador.lastChild);
  }
varciarArray(arrayProductos)})

formulario.addEventListener("submit", (e)=> {
    e.preventDefault();
    producto = document.getElementById(`producto`)
    let precio = document.getElementById(`precio`)
    let imagen = document.getElementById(`imagen`)
//aca tengo que poner un verificador de entradas con alerta
    if (producto.value == "" || precio.value == "" || imagen.value == ""){
        Swal.fire ({
            title: `Producto no cargado`,
            text: `Te falto ingresar algun dato`,
            icon: `error`,
            showConfirmButton: false,
            timer: 1500
        })
//Si los datos son correctos, primeramente se interviene el doc creando un div. giEste div va a contener una card de bootstrap donde muestre datos del objeto. Es una preview de como se va a ver el producto en la tienda. Es importante que el objeto aun no esta creado, solo se capturan los datos necesarios.
    } else {
        let manga = document.createElement(`div`)   
        let idManga = `manga-ID-${idProducto}`
        manga.setAttribute("id", idManga)
        manga.setAttribute("class", `d-inline-flex p-2`)
        listador.prepend(manga)
        manga.innerHTML =  `<div class="card" style="width: 18rem;">
        <img src="${imagen.value}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="precio">$${precio.value}</h5>
          <p class="card-text">${producto.value}</p>
          <a href="#" class="btn btn-primary" id="agregar">Agregar al carrito</a>
          <button onclick="eliminarProducto(${idProducto})">X</button>
        </div>
        </div>`
//Ahora si se crea el objeto con las reglas del constructor. Todos los valores son los ingresados por el usuario, excepto el ID. El ID es el mismo que se le asigno el div que contiene visualmente los datos del objeto. Si bien no es recomendable tener un mismo ID a dos cosas diferentes creo que al estar ligadas (el objeto, y la card que muestra los datos del objeto) no es necesario crear dos ID diferentes y es mejor aprovechar la variable. Se agrega el nuevo objeto al array de productos.
        let nuevoProducto = new productos (producto.value, precio.value, imagen.value, idManga )
        arrayProductos.push (nuevoProducto)
        producto.value =""
        precio.value = ""
        imagen.value = ''
        console.log(arrayProductos)
        idProducto++
        console.log(document)
    }
} )

//esta es la funcion que ensenio el profesor para eliminar sus tareas con alguna modificacion. Principalmente que ademas de eliminar la card que muestra los datos del objeto, tambien busca el indice del objeto que corresponde a esa card, y elimina el objeto del array.
function eliminarProducto(id) {
    let identificador = `manga-ID-${id}`
    let borrar = document.getElementById(identificador);
    listador.removeChild(borrar)
    let i = arrayProductos.indexOf(arrayProductos.find(e=>e.productoId === `manga-ID-${id}`))
    console.log(i)
    arrayProductos.splice (i,1)
    console.log(arrayProductos)
}