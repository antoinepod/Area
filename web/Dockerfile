FROM node:18.9.0-alpine3.15

WORKDIR /app
COPY . .

RUN npm ci
# RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

# RUN npm install react-scripts@3.4.1 -g --silent

CMD ["npm", "start"]
