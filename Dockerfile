FROM node 
WORKDIR /code
COPY package.json .
COPY . .
ENV NODE_PATH .
RUN npm install --silent
RUN ls
EXPOSE 3000
CMD ["./migratedScript.sh"]

