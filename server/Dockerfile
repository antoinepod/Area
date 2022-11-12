FROM node:alpine3.15

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
