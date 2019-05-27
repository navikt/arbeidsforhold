FROM node:11.7.0 as build

# Kopier filer
COPY . app/

# Kompiler arbeidsforhold
WORKDIR /app
RUN npm install && npm run build

# Kompiler test-applikasjon
WORKDIR /app/example
RUN npm install && npm run build

# Lag server
FROM nginx

# Kopier statiske filer
COPY --from=build /app/example/build /usr/share/nginx/html

# Definer produksjonsvller
ENV NODE_ENV production
ENV CI=true

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]