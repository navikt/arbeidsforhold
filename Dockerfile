FROM node:11-alpine as build

# Kopier filer
COPY dist app/dist/
COPY package.json app/package.json
COPY example app/example/

# Kompiler test-applikasjon
WORKDIR /app/example
RUN npm ci && npm run build

# Lag server
FROM nginx-alpine

# Kopier statiske filer
COPY --from=build /app /app
COPY --from=build /app/example/build /var/www/person/arbeidsforhold
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Definer produksjonsvller
ENV NODE_ENV production
ENV CI=true

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]