document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector(".enviar");
  submitButton.addEventListener("click", submitForm);

  // Añadir eventos de escucha a los campos del formulario
  addFieldListeners();
});

// Añadir eventos de escucha a los campos del formulario
function addFieldListeners() {
  const form = document.querySelector(".form-contact");
  form.querySelectorAll("input, textarea").forEach((element) => {
    element.addEventListener("input", () => {
      const fieldName = element.name;
      const fieldValue = element.value.trim();
      validateField(fieldName, fieldValue);
    });
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
      field.classList.remove("is-invalid");
    }
  }
}

function validateField(fieldName, fieldValue) {
  clearFieldError(fieldName);

  if (fieldName === "nombre") {
    if (!fieldValue) {
      showFieldError(fieldName, "El nombre es obligatorio");
    } else if (!isValidName(fieldValue)) {
      showFieldError(fieldName, "Formato de nombre inválido");
    }
  }

  if (fieldName === "email") {
    if (!fieldValue) {
      showFieldError(fieldName, "El correo electrónico es obligatorio");
    } else if (!isValidEmail(fieldValue)) {
      showFieldError(fieldName, "Formato de correo electrónico inválido");
    }
  }

  if (fieldName === "telefono") {
    if (!fieldValue) {
      showFieldError(fieldName, "El teléfono es obligatorio");
    } else if (!isValidPhone(fieldValue)) {
      showFieldError(fieldName, "Formato de teléfono inválido");
    }
  }

  if (fieldName === "mensaje") {
    if (!fieldValue) {
      showFieldError(fieldName, "El mensaje es obligatorio");
    } else if (!isValidText(fieldValue)) {
      showFieldError(fieldName, "Formato de mensaje inválido");
    }
  }

}

// Función para validar los campos de entrada
function isValidName(name) {
  const nameRegex = /^[a-zA-Z-' ]*$/;
  return nameRegex.test(name);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^(?:\+\d{1,3}\s?\d{3}|\d{3})\s?\d{3}\s?\d{3}$/;
  return phoneRegex.test(phone);
}

function isValidText(text) {
  // Permite solo letras, números y algunos signos de puntuación básicos
  const textRegex = /^[a-zA-ZÀ-ÿ0-9\s.,¡!¿?()\-'"]+$/;
  return textRegex.test(text);
}

// function isValidEmail(email) {
//   const commonDomains = ["gmail", "hotmail", "outlook", "yahoo", "aol"]; // Agrega otros dominios comunes si es necesario
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   // Dividir el correo electrónico en nombre de usuario y dominio
//   const parts = email.split("@");
//   if (parts.length !== 2) {
//     return false; // El correo electrónico no tiene un formato válido
//   }

//   const domain = parts[1];
//   if (!emailRegex.test(email)) {
//     return false; // El formato del correo electrónico no es válido
//   }

//   // Verificar si el dominio está en la lista de dominios comunes
//   const isValidDomain = commonDomains.some((commonDomain) =>
//     domain.includes(commonDomain)
//   );
//   if (!isValidDomain) {
//     return false; // El dominio no es uno de los dominios comunes
//   }

//   return true; // El correo electrónico es válido
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
    field.classList.add("is-invalid");
  }
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => errorMessage.remove());

  const fields = document.querySelectorAll("input");
  fields.forEach((field) => field.classList.remove("is-invalid"));
}

function validateForm() {
  clearErrors();
  const form = document.querySelector(".form-contact");
  let isValid = true;

  form.querySelectorAll("input, textarea").forEach((input) => {
    const fieldName = input.name;
    const fieldValue = input.value.trim();

    if (fieldName === "nombre") {
      if (!fieldValue) {
        isValid = false;
        showFieldError(fieldName, "El nombre es obligatorio");
      } else if (!isValidName(fieldValue)) {
        isValid = false;
        showFieldError(fieldName, "Formato de nombre inválido");
      }
    }

    if (fieldName === "email") {
      if (!fieldValue) {
        isValid = false;
        showFieldError(fieldName, "El correo electrónico es obligatorio");
      } else if (!isValidEmail(fieldValue)) {
        isValid = false;
        showFieldError(fieldName, "Formato de correo electrónico inválido");
      }
    }

    if (fieldName === "telefono") {
      if (!fieldValue) {
        isValid = false;
        showFieldError(fieldName, "El teléfono es obligatorio");
      } else if (!isValidPhone(fieldValue)) {
        isValid = false;
        showFieldError(fieldName, "Formato de teléfono inválido");
      }
    }

    if (fieldName === "mensaje") {
      if (!fieldValue) {
        isValid = false;
        showFieldError(fieldName, "El mensaje es obligatorio");
      } else if (!isValidText(fieldValue)) {
        isValid = false;
        showFieldError(fieldName, "Formato de mensaje inválido");
      }
    }

  });

  return isValid;
}

/*=============== ENVIO DE FORMULARIO ===============*/
function submitForm(event) {
  event.preventDefault();
  if (validateForm()) {
    // Validar el formulario
    const form = document.querySelector(".form-contact");

    Swal.fire({
      icon: "success",
      title: "¡Formulario válido!",
      text: "Enviando datos...",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      // Enviar el formulario después de que el temporizador haya expirado
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