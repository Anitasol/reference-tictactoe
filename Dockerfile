FROM node 
WORKDIR /code
COPY . .
ENV NODE_PATH .
RUN npm install --silent
EXPOSE 3000
CMD ["node", "run.js"]

