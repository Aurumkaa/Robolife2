# The first stage
# Build React static files
FROM node:16.13.2-slim as build
ARG BACKEND_URL
ENV REACT_APP_BACKEND_URL ${BACKEND_URL}

WORKDIR /app/frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm ci --silent
COPY ./frontend/ ./
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:latest
COPY --from=build /app/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
