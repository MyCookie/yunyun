FROM node:lts-alpine

WORKDIR /opt/yunyun

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "node", "index.js" ]
