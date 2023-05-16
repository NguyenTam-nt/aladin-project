FROM node:14.16 as build

WORKDIR /app

COPY . /app

RUN npm install --silent

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d



EXPOSE 3000


CMD ["nginx", "-g",  "daemon off;"]