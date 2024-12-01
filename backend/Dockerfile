FROM node:20.11.1
WORKDIR /usr/src/app
COPY package*.json .
RUN npm clean-install --omit=dev
COPY . .
EXPOSE 3001
CMD [ "npm", "start" ]