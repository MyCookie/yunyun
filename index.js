const Discord = require("discord.js");
const env = require("./env");

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user
    .setActivity(" her friends!", { type: "LISTENING" })
    .then(presence =>
      console.log(`Yunyun's ${presence.game ? presence.game.name : `none`}`)
    )
    .catch(console.error);
});

// yunyun helps her friends!
client.on("message", msg => {
  if (
    (msg.author.id !== client.user.id) &&
    msg.content.toLowerCase().startsWith("yunyun")
  ) {
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
            .send(`Welcome back, ${member.nickname}, Yunyun missed you!`)
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
              .then(`Removed role ${mod.name} for ${user.tag}`)
              .catch(console.error);

          const island = member.guild.roles.find(
            role => role.name === "Voted off the Island"
          );
          member
            .addRole(island)
            .then(`Added role ${island.name} to ${user.tag}`)
            .catch(console.error);

          msg.channel
            .send(`Why is everyone being so mean to ${member.nickname}!`)
            .then(`Yunyun said bye to a friend ${user.tag} :(`)
            .catch(console.error);
        }
      }
    } else if (msg.content.includes("bless") && msg.mentions.users) {
      // change roles
      const user = msg.mentions.users.first();
      const member = msg.guild.member(user);
      const author = msg.guild.member(msg.author);
      const modRole = author.guild.roles.find(role => role.name === "Mod");

      if (author.roles.has(modRole) && member) {
        const modRole = member.guild.roles.find(role => role.name === "Mod");
        member
          .addRole(modRole)
          .then(`Added role ${modRole.name} to ${user.tag}`);
        msg.channel
          .send(`Your friends really trust you, ${member.nickname}!`)
          .then(`Yunyun helped ${user.tag} help their friends!`)
          .catch(console.error);
      } else {
        msg.channel
          .send(`Yunyun promises to help you get closer to your friends, ${msg.author.tag}!`)
          .then(`A non-${modRole.name} user, ${msg.author.id}, tried to add ${user.id} to the role ${modRole.name}`)
          .catch(console.error);
      }
    } else if (msg.content.toLowerCase().includes("hug")) {
      msg.channel
        .send(
          `Yunyun hug! https://media.giphy.com/media/XpgOZHuDfIkoM/giphy.gif`
        )
        .then(console.log(`Yunyun hugged ${msg.author.id}!`))
        .catch(console.error);
    } else if (msg.content.toLowerCase().includes("thank you")) {
      msg.channel
        .send(":smiling_face_with_3_hearts:")
        .then(console.log(`Yunyun is greatful ${msg.author.id} is her friend!`))
        .catch(console.error);
    } else if (msg.content.includes("inspect") && msg.mentions.users) {
      // console.log(msg.mentions.users);
      msg.mentions.users.forEach((value, key) => {
        msg.channel
          .send(
            `Yunyun knows everything about her friends! Your real name is ${value.tag}, your ID is ${value.id} and your birthday is ${value.createdAt}!`
          )
          .then(
            console.log(
              `Yunyun shared everything she knew about ${value.tag} with her friends!`
            )
          )
          .catch(console.error);
      });
    } else {
      msg.channel
        .send("Yunyun is here!")
        .then(`Yunyun was summoned by ${msg.author.tag}!`)
        .catch(console.error);
    }
  }

  if (msg.content.toLowerCase().includes("why yunyun why")) {
    msg.channel.send("Yunyun is only trying to help!");
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
