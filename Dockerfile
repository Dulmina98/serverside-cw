FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN cd frontend && npm install && npm run build
EXPOSE 3000
CMD ["node", "server.js"]