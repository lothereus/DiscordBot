FROM node:6.2.0-wheezy

COPY . /app
WORKDIR /app

RUN npm install

ENTRYPOINT ["sh", "auth.sh"]
CMD ["node", "bot.js"]
