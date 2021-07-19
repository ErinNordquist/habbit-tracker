FROM node:12.2.0-alpine

WORKDIR /app
COPY . .
RUN npm install --silent
RUN npm install react-scripts -g --silent

CMD npm start