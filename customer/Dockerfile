FROM collinestes/docker-node-oracle:latest

WORKDIR /app

COPY package.json .
RUN npm install https://github.com/oracle/node-oracledb/releases/download/v3.1.2/oracledb-src-3.1.2.tgz
RUN npm install --only=prod
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]