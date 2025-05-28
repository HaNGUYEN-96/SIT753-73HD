FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY newrelic.js ./
EXPOSE 5000
CMD ["npm", "start"]