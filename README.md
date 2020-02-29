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

First time
----------

To run the bot you'll need a bot token to authorize it with the Discord app you created. To grab it, you first need an app.

Head over to https://discordapp.com/developers/applications/ to create your app, or choose one you already have.

On the side panel, go to the Bot page, you'll be asked to click to reveal the token beside the bots icon. Make a file called `env.js` in the root directory, it should look like this:

```
module.exports = {
    token: "$YOUR_TOKEN_GOES_HERE"
}
```

To grab the invite URL for the bot, go to the OAuth2 panel on the side and select your scope (bot), and the Administrator permission.
