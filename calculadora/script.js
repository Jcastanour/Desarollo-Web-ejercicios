const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

// Tú código va acá
// hint: Busca sobre la función eval

// A cada boton ponerle un evento de click.

botones.forEach((boton) => {
  boton.addEventListener("click", () => manejarBoton(boton.textContent));
});

// Con switch ir intercambiando lo que se necesite.
function manejarBoton(valor) {
  switch (valor) {
    case "=":
      calcularResultado();
      break;
    case "C":
      limpiarPantalla();
      break;
    case "←":
      borrarCaracter();
      break;
    default:
      agregarCaracter(valor);
      break;
  }
}

// Calcular el resultado de la operación
function calcularResultado() {
  try {
    let resultado = eval(pantalla.textContent);

    // Verifica si es un número válido antes de mostrarlo
    if (!isNaN(resultado)) {
      // Division por 0 es infinito. Por lo que infinity es un valor valido que se muestra.
      pantalla.textContent = Number.isInteger(resultado)
        ? resultado
        : resultado.toFixed(5); // Arreglar problema de decimales que se desbordan
    } else {
      mostrarError();
    }
  } catch (error) {
    mostrarError();
  }
}

// Borrar toda la pantalla
function limpiarPantalla() {
  pantalla.textContent = "0";
}

// Borrar un solo caracter
function borrarCaracter() {
  // Tomemos como si error fuera un todo, y no se ponga a borrar letra por letra.
  if (pantalla.textContent === "Error" || pantalla.textContent.length === 1) {
    limpiarPantalla();
  } else {
    pantalla.textContent = pantalla.textContent.slice(0, -1);
  }
}

// Agregar un caracter a la pantalla
function agregarCaracter(caracter) {
  // Si estamos en pantalla con un error, de una ponga el numero que es
  if (pantalla.textContent === "Error") {
    pantalla.textContent = caracter;
  } else {
    pantalla.textContent =
      pantalla.textContent === "0" ? caracter : pantalla.textContent + caracter;
  }
}

// Error en pantalla

function mostrarError() {
  pantalla.textContent = "Error";
}
