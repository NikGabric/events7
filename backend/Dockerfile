FROM node:18

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# EXPOSE 3000

# COPY --from=build /app/dist /app

CMD ["node", "dist/main.js"]