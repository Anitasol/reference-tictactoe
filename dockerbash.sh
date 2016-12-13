#!/bin/bash
#comment 
#Cleaning the build folder so I can start from the begining.
echo Cleaning...
rm -rf ./build

#Create a Git tag variable called GIT_COMMIT, which gives me the git tag for the latest commit
if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

# Remove .git from url in order to get https link to repo (assumes https url for GitHub)
export GITHUB_URL=$(echo $GIT_URL | rev | cut -c 5- | rev)

#
echo Building app
npm install --silent
cd client
npm install --silent
cd ..
npm run build

#If the npm build fails, we want to see a message that tells us so
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Npm build failed with exit code " $rc
    exit $rc
fi

#Puts the GIT_COMMIT tag/variable into the githash.txt file
cat > ./build/githash.txt <<_EOF_
$GIT_COMMIT
_EOF_

#Gives the variable GIT_COMMIT the value og the GIT_COMMIT tag in the .env file
cat > ./build/.env <<_EOF_
GIT_COMMIT=$GIT_COMMIT
_EOF_

#Makes the version.html file everytime we run the script, which includes app version information
cat > ./build/public/version.html << _EOF_
<!doctype html>
<head>
   <title>App version information</title>
</head>
<body>
   <span>Origin:</span> <span>$GITHUB_URL</span>
   <span>Revision:</span> <span>$GIT_COMMIT</span>
   <p>
   <div><a href="$GITHUB_URL/commits/$GIT_COMMIT">History of current version</a></div>
</body>
_EOF_

#Copies the Dockerfile into the build folder
cp ./Dockerfile ./build/
#Copies the docker-compose.yaml into the build folder
cp ./docker-compose.yaml ./build/
#Copies the package.json into the build folder
cp ./package.json ./build/
#Copies the migratedScript.sh into the build folder
cp ./migratedScript.sh ./build/
#Now when we have everything to run the program in the build folder, we go into the folder
cd build

#Prints out the tag of the docker image we are going to build
echo Building docker image
cat $GIT_COMMIT

#This command line builds the docker image from defined repository and the GIT_COMMIT variable
sudo docker build -t anitaj15/tictactoe:$GIT_COMMIT .

#If the docker doesn't build, then we want to see a message
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker build failed " $rc
    exit $rc
fi

#After the build is finnished, we want to push it to docker hub, so we don't loose our work
sudo docker push anitaj15/tictactoe:$GIT_COMMIT

#If the push fails, then we want to know about it
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker push failed " $rc
    exit $rc
fi

#This massage appears when the script has been run all the way through
echo "Done"
