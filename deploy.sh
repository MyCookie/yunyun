#!/bin/bash

docker build -t mycookie/yunyun .

docker run -d --name yunyun --restart unless-stopped mycookie/yunyun

DOCKER_ID=`docker inspect --format='{{.Id}}' yunyun`
DOCKER_HOSTNAME=`docker inspect --format='{{.Config.Hostname}}' yunyun`

echo "Container ID: $DOCKER_ID"
echo "Use docker logs $DOCKER_HOSTNAME to view logs:"

docker logs $DOCKER_HOSTNAME
