FROM node:lts-alpine AS build

WORKDIR /app

COPY *.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 5173

CMD ["nginx", "-g", "deamon off;"]
