FROM node:14
WORKDIR /pizza-house
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]