from django import forms
from django.utils import timezone
from django.core.exceptions import ValidationError

# OBLIGATORIO, si queremos que se registre en la DB, debemos inportar como en admin.py
from .models import Blog
from django.utils.html import escape  # para escapar codigo malisioso


# class BlogForm (forms.Form): => de formulario regular a PERSISTENTE
class BlogForm(forms.ModelForm):
    title = forms.CharField(
        label="Título del blog", 
        max_length=50,
        required=True,
    )
    nombre_titular = forms.CharField(
        label="Nombre del titular",
        max_length=50,
        required=False,
        # disabled=True,
    )
    img_jpg = forms.ImageField(
        label="Imagen JPG",
        widget=forms.FileInput(attrs={"accept": ".jpg"}),
    )
    img_webp = forms.ImageField(
        label="Imagen WEBP",
        widget=forms.FileInput(attrs={"accept": ".webp"}),
        required=False,
    )
    fecha = forms.DateField(
        label="Fecha",
        widget=forms.DateInput(attrs={"type": "date"}),
        disabled=True,
        initial=timezone.now().date(),  # Establece la fecha actual como valor inicial
    )
    descripcion = forms.CharField(label="Descripción", max_length=260, required=True)
    contenido = forms.CharField(label="Contenido", widget=forms.Textarea, required=True)

    def clean_title(self):
        title = self.cleaned_data["title"].strip()
        return escape(title)

    # def clean_nombre_titular => por defecto de sesion

    def clean_descripcion(self):
        descripcion = self.cleaned_data["descripcion"].strip()
        return escape(descripcion)

    def clean_contenido(self):
        contenido = self.cleaned_data["contenido"].strip()
        return escape(contenido)

    def clean_img_jpg(self):
        img_jpg = self.cleaned_data.get("img_jpg")
        if img_jpg:
            extension = img_jpg.name.split(".")[-1].lower()  # Obtener la extensión del archivo y convertirla a minúsculas
            if extension not in ["jpg"]:
                raise forms.ValidationError("La imagen JPG debe tener extensión .jpg")
        return img_jpg

    def clean_img_webp(self):
        img_webp = self.cleaned_data.get("img_webp")
        if img_webp:
            if not img_webp.name.endswith(".webp"):
                raise forms.ValidationError("La imagen WEBP debe tener extensión .webp")
        return img_webp

    def clean(self):
        cleaned_data = super().clean()
        img_jpg = cleaned_data.get("img_jpg")
        img_webp = cleaned_data.get("img_webp")

        if not img_jpg and not img_webp:
            raise ValidationError("Debe cargar al menos una imagen.")

        return cleaned_data

    class Meta:
        model = Blog
        fields = [
            "title",
            "nombre_titular",
            "img_jpg",
            "img_webp",
            "fecha",
            "descripcion",
            "contenido",
        ]
