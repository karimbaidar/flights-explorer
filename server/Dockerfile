
FROM node:14


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . /app


EXPOSE 8081


CMD [ "npx", "nodemon", "index.js" ]

