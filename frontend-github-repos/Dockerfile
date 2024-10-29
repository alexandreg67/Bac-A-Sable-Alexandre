FROM node:lts-alpine AS dev

WORKDIR /app

COPY *.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173


