FROM node 
WORKDIR /code
COPY . .
RUN npm install --silent
ENV NODE_PATH .
CMD ["node", "run.js"]
