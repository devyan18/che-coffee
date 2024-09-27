// Importar estilos CSS
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importar componentes
import { navbar } from "./components/navbar";
import { hero } from "./components/hero";
import { services } from "./components/services";

// Obtener el elemento raíz del DOM donde se montarán los componentes
const $root = document.getElementById("root");

// Realizar una solicitud para obtener la sesión del usuario actual
await fetch("http://localhost:4321/auth/me", {
  credentials: "include", // Incluir credenciales (cookies) en la solicitud
})
  .then((response) => {
    // Verificar si la respuesta es exitosa
    if (response.ok) {
      return response.json(); // Convertir la respuesta a JSON
    } else {
      return null; // Devolver null si la respuesta no es exitosa
    }
  })
  .then((session) => {
    // Añadir el componente de la barra de navegación al elemento raíz
    $root.appendChild(navbar(session ? { user: session } : null));
    // Añadir el componente de héroe al elemento raíz
    $root.appendChild(hero());
    // Añadir el componente de servicios al elemento raíz
    $root.appendChild(services(session ? { user: session } : null));
  });
