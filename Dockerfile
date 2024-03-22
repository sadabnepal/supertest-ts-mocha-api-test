FROM node:latest
WORKDIR /app
ADD . /app
RUN npm install
CMD npm test