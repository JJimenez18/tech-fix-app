# Etapa 1: Compilación
FROM node:18 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Compilar el proyecto
RUN npm run build

# Etapa 2: Servidor Nginx
FROM nginx:alpine

# Copiar el build desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
