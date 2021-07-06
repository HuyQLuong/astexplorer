FROM node:14
# Create app directory
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
ADD dist dist/
CMD ["node","dist/server.js"]