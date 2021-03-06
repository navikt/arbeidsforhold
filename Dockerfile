# Lag server
FROM nginx:alpine

# Kopier statiske filer
COPY ./example/build /var/www/person/arbeidsforhold
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Definer produksjonsvller
ENV NODE_ENV production
ENV CI=true

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]