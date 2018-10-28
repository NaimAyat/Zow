FROM node:8 as build

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

# install dependencies
RUN yarn
# copy source
COPY . .
# build
RUN yarn build

FROM nginx:1.12-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
