#!/bin/bash

DOCKER_ID=`docker inspect --format='{{.Id}}' yunyun`

echo "Stopping container $DOCKER_ID"
docker stop $DOCKER_ID

echo "Removing container $DOCKER_ID"
docker rm $DOCKER_ID
