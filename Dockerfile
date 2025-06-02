# syntax=docker/dockerfile:1
FROM node:18
RUN apt-get update && apt-get install -y bash
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh
EXPOSE 3000

