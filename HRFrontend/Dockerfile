FROM node:22 AS build
WORKDIR /app

COPY HRFrontend/package*.json ./
RUN npm install

COPY HRFrontend/ .

RUN npm run build -- --configuration=development --output-path=dist

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
