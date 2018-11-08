FROM node:8

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

# install dependencies
RUN yarn
# copy source
COPY . .

# start
EXPOSE 3000
CMD ["yarn", "dev"]
