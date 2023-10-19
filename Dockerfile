# Usa la imagen oficial de Node.js como base
FROM node:18

# Establece el directorio de trabajo en /futzo
WORKDIR /futzo

# Copia el package.json y el package-lock.json a /app
COPY package*.json ./

COPY . .

# Instala las dependencias
RUN npm install

ENV NUXT_HOST=0.0.0.0

# Expon el puerto 3000 que usa Nuxt.js
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm","run", "dev"]