FROM node:14
# Create app directory
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile
COPY . ./
RUN yarn run server-build
CMD ["node","dist/server.js"]