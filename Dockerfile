# Stage 1: Build the React application
FROM node:20-slim AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# You can pass the VITE_API_BASE at build time
ARG VITE_API_BASE
ENV VITE_API_BASE=$VITE_API_BASE
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy a custom nginx configuration template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Default port for Cloud Run is 8080
ENV PORT=8080
EXPOSE 8080

# The official Nginx image has a script that processes /etc/nginx/templates/*.template 
# and outputs to /etc/nginx/conf.d/*.conf using envsubst
CMD ["nginx", "-g", "daemon off;"]
