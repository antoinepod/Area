FROM node:18.9.0-alpine3.15

WORKDIR /app

COPY package.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "build"]
