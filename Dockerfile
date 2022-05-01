FROM node:14.17.6
WORKDIR /app
ADD . /app
RUN npm install
CMD npm test