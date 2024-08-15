document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector(".enviar");
  submitButton.addEventListener("click",submitFormTestimonials);

  // Añadir eventos de escucha a los campos del formulario
  addFieldListeners();
});

// Función para añadir eventos de escucha al campo del formulario
function addFieldListeners() {
  const form = document.querySelector(".formTestimonials");
  const textarea = form.querySelector("textarea");
  
  textarea.addEventListener("input", () => {
    const fieldName = textarea.name;
    const fieldValue = textarea.value.trim();
    validateField(fieldName, fieldValue);
  });
}

// Función para limpiar los mensajes de error de un campo específico
function clearFieldError(fieldName) {
  const field = document.querySelector(`[name="${fieldName}"]`); // Buscar cualquier elemento con el atributo name igual a fieldName
  if (field) {
    const groupDiv = field.closest(".group");
    const errorContainer = groupDiv.querySelector(".error-message");
    if (errorContainer) {
      errorContainer.remove();
    }
  }
}

function validateField(fieldName, fieldValue) {
  clearFieldError(fieldName);

  if (fieldName === "contenido") {
    if (!fieldValue) {
      showFieldError(fieldName, "El campo de reseña es obligatorio");
    } else if (!isValidText(fieldValue)) {
      showFieldError(fieldName, "Formato de texto inválido");
    } else if (!isValidContent(fieldValue)) {
      showFieldError(fieldName, "El contenido no puede tener más de 250 caracteres");
    }
  }

}

function isValidText(text) {
  // Permite solo letras, números y algunos signos de puntuación básicos
  const textRegex = /^[a-zA-ZÀ-ÿ0-9\s.,¡!¿?()\-'"]+$/;
  return textRegex.test(text);
}

function isValidContent(content) {
  // Verifica si el contenido tiene 250 caracteres o menos
  return content.length <= 250;
}

// function isValidContent(content) {
//   const words = content.trim().split(/\s+/); // Dividir por cualquier espacio en blanco / palabras 
//   return words.length <= 20;
// }

function showFieldError(fieldName, errorMessage) {
  const field = document.querySelector(`[name="${fieldName}"]`); // Buscar cualquier elemento con el atributo name igual a fieldName
  if (field) {
    const groupDiv = field.closest(".group");
    let errorContainer = groupDiv.querySelector(".error-message");

    if (!errorContainer) {
      errorContainer = document.createElement("div");
      errorContainer.className = "error-message";
      groupDiv.appendChild(errorContainer);
    }

    errorContainer.innerHTML = errorMessage;
  }
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => errorMessage.remove());
}


function validateFormRegister() {
  clearErrors(); // Limpiar errores previos

  const form = document.querySelector(".formTestimonials");
  const textarea = form.querySelector("textarea");
  const fieldName = textarea.name;
  const fieldValue = textarea.value.trim();

  let isValid = true;

  // Validar contenido del textarea
  if (fieldName === "contenido") {
    if (!fieldValue) {
      isValid = false;
      showFieldError(fieldName, "El campo de reseña es obligatorio");
    } else if (!isValidText(fieldValue)) {
      isValid = false;
      showFieldError(fieldName, "Formato de texto inválido");
    } else if (!isValidContent(fieldValue)) {
      isValid = false;
      showFieldError(fieldName, "El contenido no puede tener más de 250 caracteres");
    }
  }

  return isValid;
}


function checkUserTestimonial(callback) {
  fetch("/check_user_testimonial/")
    .then((response) => response.json())
    .then((data) => {
      callback(data.has_testimonial);
    })
    .catch((error) => {
      console.error("Error:", error);
      callback(false);
    });
}

/*=============== ENVÍO DE FORMULARIO ===============*/
function submitFormTestimonials(event) {
    event.preventDefault();
    
    checkUserTestimonial(hasTestimonial => {
        if (hasTestimonial) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ya has escrito una reseña.",
            });
        } else {
            if (validateFormRegister()) {
                const form = document.querySelector(".formTestimonials");

                Swal.fire({
                    icon: "success",
                    title: "¡Formulario válido!",
                    text: "Enviando reseña...",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    form.submit();
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Por favor, corrige los errores en el formulario antes de enviarlo.",
                });
                console.log("Formulario inválido. No se puede enviar.");
            }
        }
    });
}
