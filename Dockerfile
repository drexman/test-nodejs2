FROM node

ADD . /src

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . /test-nodejs2 

EXPOSE 3000

CMD ["npm", "start"]