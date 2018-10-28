FROM node:8

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

# install dependencies
RUN yarn
# copy source
COPY . .
# build
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
