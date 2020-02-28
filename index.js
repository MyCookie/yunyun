const Discord = require("discord.js");
const env = require("./env");

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user
    .setActivity("to her friends!", { type: "LISTENING" })
    .then(presence =>
      console.log(`Yunyun's ${presence.game ? presence.game.name : `none`}`)
    )
    .catch(console.error);
});

// yunyun helps her friends!
client.on("message", msg => {
  if (msg.content.startsWith("yunyun") || msg.content.startsWith("Yunyun")) {
    if (msg.content.includes("ping")) {
      const replies = ["私の 名前は ゆんゆん です！", "このすば!", "Pong!"];

      msg
        .reply(replies[Math.floor(Math.random() * replies.length)])
        .then(console.log(`Yunyun was pinged by ${msg.author.tag}!`))
        .catch(console.error);
    } else if (
      msg.content.includes("bring") &&
      msg.content.includes("back") &&
      msg.mentions.users
    ) {
      // bring back the user to the island
      const user = msg.mentions.users.first();
      if (user) {
        const member = msg.guild.member(user);
        if (member) {
          const island = member.guild.roles.find(
            role => role.name === "Voted off the Island"
          );
          member
            .removeRole(island)
            .then(`Removed role ${island.name} for ${user.tag}`)
            .catch(console.error);
          msg.channel
            .send(
              member.nickname,
              "welcome back, your friends must've really missed you!"
            )
            .then(
              console.log(
                `Yunyun brought back a friend to the island, ${msg.author.tag}!`
              )
            )
            .catch(console.error);
        }
      }
    } else if (
      msg.content.includes("vote") &&
      msg.content.includes("off") &&
      msg.content.includes("island") &&
      msg.mentions.users
    ) {
      // remove the user from the island, and remove the mod role if they have one
      const user = msg.mentions.users.first();
      if (user) {
        const member = msg.guild.member(user);
        if (member) {
          const mod = member.guild.roles.find(role => role.name === "Mod");
          if (mod)
            member
              .removeRole(mod)
              .then(`Removed role ${mod.name} for ${user.tag}`);

          const island = member.guild.roles.find(
            role => role.name === "Voted off the Island"
          );
          member
            .addRole(island)
            .then(`Added role ${island.name} to ${user.tag}`)
            .catch(console.error);

          msg.channel
            .send(member.nickname, "why is everyone being so mean to you!")
            .then(`Yunyun said bye to a friend ${user.tag} :(`)
            .catch(console.error);
        }
      }
    } else if (msg.content.includes("bless") && msg.mentions.users) {
      // change roles
      const user = msg.mentions.users.first();
      if (user) {
        const member = msg.guild.member(user);
        if (member) {
          const modRole = member.guild.roles.find(role => role.name === "Mod");
          member
            .removeRole(modRole)
            .then(`Added role ${modRole.name} to ${user.tag}`);
          msg.channel
            .send(member.nickname, "your friends really trust you!")
            .then(`Yunyun helped ${user.tag} help their friends!`)
            .catch(console.error);
        }
      }
    } else if (msg.content.includes("inspect") && msg.mentions.users) {
      // console.log(msg.mentions.users);
      msg.mentions.users.forEach((value, key) => {
        msg.channel
          .send(
            `Yunyun knows everything about her friends! Your name is ${value.tag}, your ID is ${value.id} and your birthday is ${value.createdAt}!`
          )
          .then(
            console.log(
              `Yunyun shared everything she knew about ${value.tag} with her friends!`
            )
          )
          .catch(console.error);
      });
    } else {
      if (msg.member.id != client.user.id)
        msg.channel
          .send("Yunyun is here!")
          .then(`Yunyun was summoned by ${msg.author.tag}!`)
          .catch(console.error);
    }
  }
});

// yunyun makes a new friend!
client.on("guildMemberAdd", member => {
  member.guild.channels
    .find(channel => channel.name === "general")
    .send("Yunyun made a new friend!")
    .then(`Yunyun met a new friend in ${member.user.tag}!`)
    .catch(console.error);
});

client.login(env.token);
