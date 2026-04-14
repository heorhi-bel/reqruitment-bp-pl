FROM node:18 AS development

ENV NODE_ENV=development

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm ci && npm install --save-dev sequelize-cli

COPY . .

EXPOSE 8080

CMD ["sh", "-c", "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm start"]