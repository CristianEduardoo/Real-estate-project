import re
from django import forms
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.utils.html import escape

# OBLIGATORIO, si queremos que se registre en la DB, debemos inportar como en admin.py
from users.models import Testimoniales


class ContactForm(forms.Form):
    # ======== Campos de información personal ========
    nombre = forms.CharField(
        label="Nombre completo",
        max_length=100,
        widget=forms.TextInput(attrs={"placeholder": "Ingrese su nombre"}),
    )
    email = forms.EmailField(
        label="Email",
        widget=forms.EmailInput(attrs={"placeholder": "Ingrese su email"}),
    )
    
    telefono = forms.CharField(
        label="Teléfono",
        max_length=15,  # Puedes ajustar el max_length según sea necesario
        widget=forms.TextInput(
            attrs={"placeholder": "Ingrese su teléfono", "type": "tel"}
        ),
    )
    mensaje = forms.CharField(
        label="Mensaje",
        widget=forms.Textarea(
            attrs={"placeholder": "Escriba un breve mensaje"}
        ),
    )

    # Definir fieldsets como una lista de tuplas
    fieldsets = [
        ("Información personal", ["nombre", "email", "telefono", "mensaje"]),
        # ("Información sobre la propiedad", ["venta_compra", "presupuesto"]),
        # ("Método de contacto", ["contacto", "fecha", "hora"]),
    ]

    def clean_nombre(self):
        nombre = self.cleaned_data["nombre"].strip()
        return escape(nombre)

    def clean_email(self):
        email = self.cleaned_data.get("email").strip()
        try:
            validate_email(email)
        except ValidationError:
            raise forms.ValidationError("Por favor, ingrese un correo electrónico válido.")
        return escape(email)

    def clean_telefono(self):
        telefono = self.cleaned_data.get("telefono").strip()
        # Definir la expresión regular
        phone_regex = re.compile(r'^(?:\+\d{1,3}\s?\d{3}|\d{3})\s?\d{3}\s?\d{3}$')

        # Validar el teléfono contra la expresión regular
        if not phone_regex.match(telefono):
            raise ValidationError("El número de teléfono no es válido. Debe seguir el formato adecuado.")

        # Escapar cualquier carácter potencialmente peligroso
        return escape(telefono)

    def clean_mensaje(self):
        mensaje = self.cleaned_data["mensaje"].strip()
        return escape(mensaje)


class TestimonialForm(forms.ModelForm):

    contenido = forms.CharField(label="Contenido", widget=forms.Textarea, required=True)

    def clean_contenido(self):
        contenido = self.cleaned_data["contenido"].strip()
        max_characters = 250  # define el máximo de caracteres permitidos
        content_regex = re.compile(r'^[a-zA-ZÀ-ÿ0-9\s.,¡!¿?()\-"\'\']+$')

        if len(contenido) > max_characters:
            raise forms.ValidationError(
                f"El contenido no puede tener más de {max_characters} caracteres"
            )

        if not content_regex.match(contenido):
            raise forms.ValidationError(
                "El contenido solo puede contener letras, números, y algunos signos de puntuación permitidos."
            )

        return escape(contenido)


    class Meta:
        model = Testimoniales
        fields = [
            "contenido"
        ]
