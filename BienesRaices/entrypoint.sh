#!/bin/sh

# Ejecutar migraciones de base de datos
python manage.py migrate --noinput

# Recopilar archivos estáticos
python manage.py collectstatic --noinput

# Ejecutar el servidor
exec "$@"