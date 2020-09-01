FROM node:14.7.0-alpine3.10

# Create app directory
WORKDIR /usr/src/app/api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "npm", "run","server" ]
