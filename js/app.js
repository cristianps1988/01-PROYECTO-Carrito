// variables

const listadoCursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() { 
    // cuando se le da click a un curso en "agregar carrito"
    listadoCursos.addEventListener('click', agregarCurso);

    // elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // resetear el arreglo
        limpiarHTML(); // eliminar el HTML
    })
}

// funciones
function agregarCurso(e){
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement; // voy hasta el card del curso seleccionado
        leerDatosCurso(cursoSeleccionado); // se lo paso por parametro a otra funcion que va hacer otro trabajo
    }
}

// eliminar curso del carrito
function eliminarCurso(e){
    if(e.target.classList == 'borrar-curso'){ // identificando el boton de borrar curso
        const cursoId = e.target.getAttribute('data-id'); // id del elemento a eliminar

        // eliminar del arreglo
        articulosCarrito = articulosCarrito.filter(e => e.id !== cursoId)
        console.log(articulosCarrito);
        carritoHTML(); // volver a iterar sobre el carrito y mostrar HTML
    }
}


// lee el contenido html al al que se le dio click y extrae la informacion del curso
function leerDatosCurso(curso){ // recibe por parametro la info del curso 
    console.log(curso);
    // creamos un objeto con la informacion que necesitamos
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    // revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( e => e.id == infoCurso.id);
    console.log(existe); // true o false
    if(existe){
        // actualizamos cantidad
        const cursos = articulosCarrito.map( e => {
            if(e.id == infoCurso.id){
                e.cantidad++;
                return e;
            } else{
                return e;
            }
        });
        articulosCarrito = [...cursos];

    } else{
        // agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    console.log(infoCurso);
    // agregar elementos al arreglo carrito
    console.log(articulosCarrito);
    carritoHTML();
}


// muestra el carrito de compras en el HTML
function carritoHTML(){
    limpiarHTML();
    articulosCarrito.forEach(e => {
        const {imagen, nombre, precio, id, cantidad} = e;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src='${imagen}' width=100 ></td>
        <td>${nombre}</td>
        <td>${precio} </td>
        <td>${cantidad} </td>
        <td><a href='#' class='borrar-curso' data-id='${id}'>X</a> </td>
        `;
        contenedorCarrito.appendChild(row);
    })
    console.log(contenedorCarrito);
}

// limpiar carrito
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}