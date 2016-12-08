#node is the base image that is used to start the build process
FROM node
#tells us that the CMD command is going to be executed in /code
WORKDIR /code
COPY package.json .
COPY . .
#sets the environment variable to NODE_PATH
ENV NODE_PATH .
#runs npm install from the image
#silent quiets down many number of lines that are unnecessary to show
RUN npm install --silent
#associates the port 3000 to enable networking between the running process inside the container and the host
EXPOSE 3000
#executes run command for the ./migratedScript.sh
CMD ["./migratedScript.sh"]
