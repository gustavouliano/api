FROM node:18
WORKDIR /project/src
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "index.js" ]