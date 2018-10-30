## build container
FROM node:8 as build

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

# install dependencies
RUN yarn
# copy source
COPY . .
# build
RUN yarn build

## execution container
FROM nginx:alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
