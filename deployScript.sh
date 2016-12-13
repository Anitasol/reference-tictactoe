#!/bin/bash

scp -o StrictHostKeyChecking=no -i "~/ToeKey.pem" ./docker-compose.yaml ec2-user@ec2-35-164-226-192.us-west-2.compute.amazonaws.com:~/docker-compose.yaml
scp -o StrictHostKeyChecking=no -i "~/ToeKey.pem" ./.env ec2-user@ec2-35-164-226-192.us-west-2.compute.amazonaws.com:~/.env
scp -o StrictHostKeyChecking=no -i "~/ToeKey.pem" ./run-docker-compose.sh ec2-user@ec2-35-164-226-192.us-west-2.compute.amazonaws.com:~/run-docker-compose.sh

#run docker-compose up
ssh -i ~/ToeKey.pem ec2-user@ec2-35-164-226-192.us-west-2.compute.amazonaws.com "./run-docker-compose.sh"
