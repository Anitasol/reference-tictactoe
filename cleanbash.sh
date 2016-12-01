#!/bin/bash
# Stop all containers
docker kill $(docker ps -q)
#Stop all images
#docker kill $(docker images -q)
# Delete all containers
docker rm $(docker ps -a -q)
# Delete all images
docker rmi $(docker images -q)