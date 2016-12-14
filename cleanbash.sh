#!/bin/bash

# Stop all containers
sudo docker kill $(docker ps -q)
#Stop all images
#docker kill $(docker images -q)
# Delete all containers
sudo docker rm $(docker ps -a -q)
# Delete all images
sudo docker rmi $(docker images -q)
