FROM node 
WORKDIR /code
COPY . .
RUN npm install
ENV export NODE_PATH .
CMD ["node", "run.js"]
