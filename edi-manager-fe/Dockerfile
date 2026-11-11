FROM node:24-alpine3.23@sha256:0efee1e068d21f6edcab7fa8c962fc4ecd50d4e28727bc23963379b63ee318ab AS development-stage

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM development-stage AS build-stage

RUN npm run build

FROM nginx:1.27-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
