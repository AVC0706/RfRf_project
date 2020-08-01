FROM node:14.7.0-alpine3.10 as react-build

# Create app directory
WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN npm run-script build

# Stage 2 - Deploy with NGNIX
FROM nginx

COPY --from=react-build /usr/src/app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]