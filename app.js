//seleccionamos todos los inputs para ir asignando sus valores al objeto
const vehiculoInput = document.querySelector(`#vehiculo`);
const servicioInput = document.querySelector(`#servicio`);
const fechaInput = document.querySelector(`#date`);
const horaInput = document.querySelector(`#hora`);
const textInput = document.querySelector(`textarea`);
const contenedorcitas = document.querySelector(`.citas`);
const citasBoton = document.querySelector(`.bform`);
const formulario = document.querySelector(`#formulario`);
//este objeto ira formando cada cita para imprimirlos en citas
const citaObj = {
  vehiculo: "",
  servicio: "",
  date: "",
  hora: "",
  text: "",
};

class Citas {
  constructor() {
    this.citas = [];
  }
  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }
  eliminarcita(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
  }
}
const administrarCitas = new Citas();
//de esta forma con eventlisteners en input se llamara datos cita cada vez que se modifique alguno de los puts
eventListeners();
function eventListeners() {
  vehiculoInput.addEventListener("input", datosCita);
  servicioInput.addEventListener("input", datosCita);
  fechaInput.addEventListener("input", datosCita);
  horaInput.addEventListener("input", datosCita);
  textInput.addEventListener("input", datosCita);
  citasBoton.addEventListener("click", nuevaCita);
}
//con la siguiente funcion llenamos el objeto, esa sintaxis funciona si el nombre asignado en el html es igual al nombre de los items del objeto
function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

function nuevaCita(e) {
  const { vehiculo, servicio, date, hora, text } = citaObj;
  if (
    vehiculo === "" ||
    servicio === "" ||
    date === "" ||
    hora === "" ||
    text === ""
  ) {
    ui.imprimirAlerta(`Todos los campos son obligatorios`, `error`);
  } else {
    //para que cada cita tenga un identificador unico para luego diferenciarlas del resto podemos utilizar la fecha actual que utiliza hasta los segundos del dia
    citaObj.id = Date.now();
    //se le envia una copia de citobt y no el objeto como tal para que no se dupliquen las citas, sino se sobreescriben por alguna razon
    administrarCitas.agregarCita({ ...citaObj });
    //el siguiente codigo solo funciona si el elemento seleccionado es un form en el html, y entonces reinicia todos sus inputs
    formulario.reset();
    //reiniciamos el objeto una vez se haya enviado la informacion a citas o agregar citas
    reiniciarObjeto();
    //mostrar las citas en el html
    ui.imprimirCitas(administrarCitas);
  }
}

// de esta forma podemos generear la alarte usando class, se le llama cada vez que se de click en enviar cita y se le envia el mensaje de error en caso de estar un input vacio para que imprima la laerta
class UI {
  imprimirAlerta(mensaje, tipo) {
    const alerta = document.createElement(`DIV`);
    // el primer formulario es el form y no el div, por lo tanto utilizamos este para que la alerta quede dentro de la caja
    const formulario2 = document.querySelector(`.formulario`);
    alerta.classList.add(tipo);
    const alertaCheck = document.querySelector(`.error`);
    alerta.textContent = mensaje;
    if (alertaCheck === null) {
      formulario2.appendChild(alerta);
    }
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
  //se coloca {citas} entre llaves para que salga el arreglo directamente sino, es como citas dentro de citas.
  imprimirCitas({ citas }) {
    limpiarHTML();
    citas.forEach((cita) => {
      const { vehiculo, servicio, date, hora, text, id } = cita;
      const divCita = document.createElement(`DIV`);
      divCita.classList.add(`citaX`);
      // le agregamos a cada div de cada cita el ID como un atributo personalizado
      divCita.dataset.id = id;
      //Construimos el html para cada una de las respuestas de los inputs
      const vehiculoParrafo = document.createElement(`H5`);
      vehiculoParrafo.textContent = vehiculo;
      const servicioParrafo = document.createElement(`H5`);
      servicioParrafo.textContent = servicio;
      const dateParrafo = document.createElement(`H5`);
      dateParrafo.textContent = date;
      const horaParrafo = document.createElement(`H5`);
      horaParrafo.textContent = hora;
      const textParrafo = document.createElement(`H5`);
      textParrafo.textContent = text;
      //boton para eliminar la cita
      const btnEliminar = document.createElement(`button`);
      btnEliminar.innerHTML = "X";
      btnEliminar.onclick = () => eliminarcita(id);

      //colocamos cada uno de los inputs en el contenedor de la cita
      divCita.appendChild(vehiculoParrafo);
      divCita.appendChild(servicioParrafo);
      divCita.appendChild(dateParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(textParrafo);
      divCita.appendChild(btnEliminar);
      contenedorcitas.appendChild(divCita);
    });
  }
}
function limpiarHTML() {
  while (contenedorcitas.firstChild) {
    contenedorcitas.removeChild(contenedorcitas.firstChild);
  }
}
const ui = new UI();

function reiniciarObjeto() {
  citaObj.vehiculo = "";
  citaObj.servicio = "";
  citaObj.date = "";
  citaObj.hora = "";
  citaObj.text = "";
}

function eliminarcita(id) {
  //eliminar la cita
  administrarCitas.eliminarcita(id);
  ui.imprimirCitas(administrarCitas);
}
