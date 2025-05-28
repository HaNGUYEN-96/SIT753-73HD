FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]
ENV NEW_RELIC_NO_CONFIG_FILE=true