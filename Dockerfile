FROM node:lts

WORKDIR /opt/yunyun

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "node", "index.js" ]
