document.addEventListener("DOMContentLoaded", function () {
  darkMode();
  applyDarkModeFromLocalStorage();
  burgerMenu();
  // Envolver showSlides en try-catch
  try {
    showSlides();
  } catch (error) {
    console.error("Error en showSlides()=>función js solo en index:", error);
  }
  userFuncions();
});

/*=============== DarkMode/icono moon-sun ===============*/
function darkMode() {
  const btnDarkMode = document.querySelector(".dark-mode-btn");
  btnDarkMode.addEventListener("click", function () {
    // Toggle de la clase 'dark-mode' en el body
    document.body.classList.toggle("dark-mode");

    let darkModeIcon;
    if (document.body.classList.contains("dark-mode")) {
      // Modo oscuro activado: cambia-guarda a ícono de sol
      btnDarkMode.classList.remove("fa-moon");
      btnDarkMode.classList.add("fa-sun");
      darkModeIcon = "fa-sun";
    } else {
      // Modo oscuro desactivado: cambia-guarda a ícono de luna
      btnDarkMode.classList.remove("fa-sun");
      btnDarkMode.classList.add("fa-moon");
      darkModeIcon = "fa-moon";
    }

    // Guardamos el estado del modo oscuro en el almacenamiento local
    const isDarkModeEnabled = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkModeEnabled", isDarkModeEnabled);
    localStorage.setItem("darkModeIcon", darkModeIcon);

    // console.log("Dark mode enabled:", isDarkModeEnabled);
    // console.log("Dark mode icon:", darkModeIcon);
  });
}

/*=============== DarkMode-LocalStorage ===============*/
function applyDarkModeFromLocalStorage() {
  // Verificamos si el modo oscuro está activado en el almacenamiento local
  const isDarkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";
  // Verificamos el ícono almacenado en el almacenamiento local
  const darkModeIcon = localStorage.getItem("darkModeIcon");

  // console.log("Apply dark mode from local storage:");
  // console.log("Dark mode enabled:", isDarkModeEnabled);
  // console.log("Dark mode icon:", darkModeIcon);

  // Si el modo oscuro está activado, aplicamos la clase 'dark-mode' al body
  if (isDarkModeEnabled) {
    document.body.classList.add("dark-mode");
  }

  // Aplicamos el ícono correspondiente si está almacenado
  if (darkModeIcon) {
    const btnDarkMode = document.querySelector(".dark-mode-btn");
    btnDarkMode.classList.remove("fa-moon", "fa-sun");
    btnDarkMode.classList.add(darkModeIcon);
  }
}

/*=============== Menú Hamburguesa ===============*/
function burgerMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");

  mobileMenu.addEventListener("click", function () {
    const navegacion = document.querySelector(".navegacion-header");
    // Toggle en la clase navegación
    navegacion.classList.toggle("mostrar");
    // Toggle en la clase myDropdown
    document.getElementById("myDropdown").classList.toggle("mostrar");
  });
}

/*=============== ShowSlides - Testimonials ===============*/
let slideIndex = 0;
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove("fade-in");
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "flex";
  setTimeout(() => {
    slides[slideIndex - 1].classList.add("fade-in");
  }, 10); // Slight delay to trigger transition

  setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

/*=============== Funciones de usuario legeado ===============*/
function userFuncions() {
  const user = document.querySelector(".user-logged");
  /*=============== Sidebar-User ===============*/
  user.addEventListener("click", function () {
    const sidebarUser = document.querySelector(".siderbar-user");

    sidebarUser.classList.toggle("mostrarSiber");
  });
}