document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
  darkMode();
  applyDarkModeFromLocalStorage();
});

/*=============== DarkMode ===============*/
function darkMode() {
  const btnDarkMode = document.querySelector(".dark-mode-btn");
  btnDarkMode.addEventListener("click", function () {
    // Toggle de la clase 'dark-mode' en el body
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      // Modo oscuro activado: cambiar a ícono de sol
      btnDarkMode.classList.remove("fa-moon");
      btnDarkMode.classList.add("fa-sun");
    } else {
      // Modo oscuro desactivado: cambiar a ícono de luna
      btnDarkMode.classList.remove("fa-sun");
      btnDarkMode.classList.add("fa-moon");
    }

    // Guardamos el estado del modo oscuro en el almacenamiento local
    const isDarkModeEnabled = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkModeEnabled", isDarkModeEnabled);
  });
}

/*=============== Menú Hamburguesa ===============*/
function eventListeners() {
  const mobileMenu = document.querySelector(".mobile-menu");
  mobileMenu.addEventListener("click", function () {
    const navegacion = document.querySelector(".navegacion-header");
    // Toggle en la clase navegación
    navegacion.classList.toggle("mostrar");
    // Toggle en la clase myDropdown
    document.getElementById("myDropdown").classList.toggle("mostrar");
  });
}

/*=============== DarkMode-LocalStorage ===============*/
function applyDarkModeFromLocalStorage() {
  // Verificamos si el modo oscuro está activado en el almacenamiento local
  const isDarkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";
  // Si el modo oscuro está activado, aplicamos la clase 'dark-mode' al body
  if (isDarkModeEnabled) {
    document.body.classList.add("dark-mode");
  }
}
