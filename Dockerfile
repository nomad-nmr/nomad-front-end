FROM node:16

WORKDIR /app

COPY package.json /app/

RUN npm install --force

## next line allows to avoid overwriting node_modules using anonymous volume
# RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

EXPOSE 3003

CMD ["npm", "run" , "dev-docker"]