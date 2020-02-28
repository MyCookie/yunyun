Build using docker:

`docker build -t yunyun .`

`docker run -d --name yunyun-bot --restart unless-stopped yunyun`

To access logs you first need its ID:

`docker ps`

`docker logs $CONTAINER_ID`
