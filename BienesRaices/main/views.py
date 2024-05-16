from django.shortcuts import render
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.html import escape
from django.http import Http404

# libreria para enviar un correo electronico
from django.core.mail import send_mail

# Importamos los modelos o formularios
from .models import Propiedades
from .forms import ContactForm
from blog.models import Blog  # Importa el modelo Blog de la app blog


# Create your views here.

def my_main(request):
    # Obtener los tres primeros elementos de Propiedades
    solo_tres_propiedades = Propiedades.objects.all()[:3]
    
    # Obtener los dos primeros elementos de Blog
    solo_dos_blog = Blog.objects.all()[:2]
    
    return render(request, "plantillas/index.html", {"solo_tres": solo_tres_propiedades, "solo_dos": solo_dos_blog})


def nosotros(request):
    return render(request, 'plantillas/nosotros.html')


def anuncios(request):
    query_result = Propiedades.objects.all()
    # query_result = Propiedades.objects.filter(vendido=False)
    return render(request, "plantillas/anuncios.html", {"clave": query_result})


def anuncio_detalles(request, id):
    try:
        # busca el registro cuyo ID es igual al pasado por URL
        detail = Propiedades.objects.get(id=id)
    except Propiedades.DoesNotExist:
        # Si no existe ese ID lanza la excepcion DoesNotExist y capturada con un try-except
        raise Http404("La Propiedad no existe")

    return render(request, "plantillas/anuncio.html", {"details": detail})


def contacto(request):
    if request.method == "POST":

        # Renderizar la plantilla de éxito
        return render(request, "plantillas/contacto.html", {"success": True})

    return render(request, "plantillas/contacto.html")


def contacto(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            # Aquí puedes acceder a los datos del formulario validado
            # nombre = form.cleaned_data["nombre"]
            email = form.cleaned_data["email"]
            telefono = form.cleaned_data["telefono"]
            mensaje = form.cleaned_data["mensaje"]
            
            # Aquí puedes hacer lo que quieras con los datos del formulario,
            # como enviar un correo electrónico, almacenarlos en la base de datos, etc.
            

            # Después de manejar los datos del formulario, puedes redirigir o renderizar una plantilla
            return render(request, "plantillas/contacto.html", {"success": True})
    else:
        initial_data = {
            "nombre": request.user.username,
           
        }
        form = ContactForm(initial=initial_data)

    return render(request, "plantillas/contacto.html", {"formContacto": form})
