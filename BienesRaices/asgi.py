import os

# 1) Define la variable de entorno lo antes posible
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "BienesRaices.settings")

# 2) Inicializar Django antes de importar módulos que cargan modelos
import django

django.setup()

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

# 3) Ahora sí es seguro importar routing/consumers que usan modelos
import chat.routing

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AuthMiddlewareStack(URLRouter(chat.routing.websocket_urlpatterns)),
    }
)
