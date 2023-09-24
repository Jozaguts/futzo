# Usa la imagen oficial de Node.js como base
FROM node:18

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y el package-lock.json a /app
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

## Compila la aplicación para producción
RUN npm run build

# Expon el puerto 3000 que usa Nuxt.js
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
# Comando para iniciar la aplicación
CMD ["npm","run", "dev"]