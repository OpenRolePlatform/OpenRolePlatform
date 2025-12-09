FROM node:22
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE ${BACKEND_PORT}
CMD [ "npm", "start" ]
