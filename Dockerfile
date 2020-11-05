FROM ubuntu:18.04

RUN apt-get update && apt-get install -y tzdata curl
ENV TZ=Asia/Tokyo

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs chromium-browser

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]