FROM python:3.10
# Variable de entorno para que Python no buforee stdout/stderr - input/output
ENV PYTHONUNBUFFERED=1

# Instala dependencias del sistema
RUN apt-get update && apt-get install -y \
    gnupg2 \
    curl \
    apt-transport-https && \
    rm -rf /var/lib/apt/lists/*


# Establecemos el directorio de trabajo
WORKDIR /code

# Copiamos el archivo de requerimientos al directorio de trabajo - Copia => Origen/Destino
COPY requirements.txt /code/

# Actualizamos pip e instalamos las dependencias en un solo RUN para minimizar capas
RUN pip install --no-cache-dir --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copiamos el resto del código al directorio de trabajo
COPY . /code/

# Expone el puerto interno de Gunicorn
EXPOSE 8000

# Comando para ejecutar Gunicorn
CMD ["gunicorn", "-c", "config/gunicorn/gunicorn_config.py", "BienesRaices.wsgi:application"]

# Usar Daphne para manejar WebSockets y HTTP
# CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "BienesRaices.asgi:application"]


# CMD ["gunicorn", "-c", "config/gunicorn/gunicorn_config.py", "--bind", ":8000", "--chdir", "BienesRaices", "BienesRaices.wsgi:application"]
# command: python manage.py runserver 0.0.0.0:8000 # IP => donde quiero que monte el proyecto!! ejem: 127.0.0.1:8000

# ======== wait-for-it.sh => para que la aplicacíon espere a la DB ======== #
# Copiamos wait-for-it.sh al contenedor
# COPY wait-for-it.sh /code/
# RUN chmod +x /code/wait-for-it.sh

# Comando por defecto para iniciar el contenedor
# CMD ["/code/wait-for-it.sh", "db:5432", "--", "python", "manage.py", "runserver", "0.0.0.0:8000"]

# ======== Comando de instalación ======== #
# curl -o wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
# chmod +x wait-for-it.sh