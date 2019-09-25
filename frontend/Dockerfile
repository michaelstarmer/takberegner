FROM node:10.15.1
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production

COPY ./src/package*.json /app/
COPY ./src /app/
RUN npm uninstall -g serve
RUN npm install -g serve@10.1.1


WORKDIR /app
RUN npm i
RUN npm run build
#EXPOSE 3000
#CMD ["npm", "start"]
EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "tcp://0.0.0.0:5000"]
