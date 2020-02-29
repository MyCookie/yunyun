Yunyun is here to help!
=======================

Building
--------

Install `node.js` and `npm`, and run `npm install` in the project root.

Use `npm start` to start the bot.

Deploying
---------

Build using docker:

`docker build -t yunyun .`

`docker run -d --name yunyun-bot --restart unless-stopped yunyun`

To access logs you first need its ID:

`docker ps`

`docker logs $CONTAINER_ID`

To make things easier there's an untested shell script `deploy.sh` that will do the above.
