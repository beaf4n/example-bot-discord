const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
    console.log('Pinging');
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.repl.co/`);
}, 280000);

const {
    Client,
    Attachment
} = require('discord.js');

const Discord = require('discord.js');
const bot = new Client();
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const ytdl = require("ytdl-core");
const opus = require('opusscript');
const AntiSpam = require('discord-anti-spam');
const fs = require('fs');
const config = require("./config.json");
const Date = require("new-date");
const format = require("moment-duration-format");
const nodefetch = require("node-fetch");
const moment = require('moment');
const { Command } = require('discord.js-commando')
client.on('ready', () => console.log(`Aktif Sebagai ${client.user.tag}.`));

const presence = [
  `Presence 1`, // Presence 1
  `Presence 2`, // Presence 2
  `Presence 3`, // Presence 3
  `Presence 4` // Presence 4 | Presence Akan Berganti-ganti, silahkan sesuaikan sendiri
];

let index = 0;
setInterval(() => {
  if(index === presence.length) index = 0;
  const status = presence[index];
  console.log('Memperbarui Presence');
  client.user.setActivity(status, { type: 'WATCHING'});
  index++;
}, 5000)

//antispam script
client.on('message', (message) => antiSpam.message(message));
const antiSpam = new AntiSpam({
    warnThreshold: 5, // Amount of messages sent in a row that will cause a warning.
    kickThreshold: 6, // Amount of messages sent in a row that will cause a kick.
    banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    muteThreshold: 8, // Amount of messages sent in a row that will cause a mute.
    maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, Tolong Berhenti Spam Atau Kamu Akan Di Kick Oleh System.', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{user_tag}** Dikeluarkan Karena Spam.', // Message that will be sent in chat upon kicking a user.
    banMessage: '**{user_tag}** Dibanned Karena Spam.', // Message that will be sent in chat upon banning a user.
    muteMessage: '**{user_tag}** Dibisukan Karena Spam.', // Message that will be sent in chat upon muting a user.
    maxDuplicatesWarning: 5, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 6, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 7, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesMute: 8, // Amount of duplicate messages that trigger a warning.
    // Discord permission flags: https://discord.js.org/#/docs/main/master/class/Permissions?scrollTo=s-FLAGS
    exemptPermissions: ['ADMINISTRATOR'], // Bypass users with any of these permissions(These are not roles so use the flags from link above).
    ignoreBots: false, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredUsers: [], // Array of User IDs that get ignored.
});

//Listner Event: User joining the discord server
bot.on('guildMemberAdd', member => {
    console.log('User' + member.user.tag + 'has joined the server!');

    var role = member.guild.roles.find('name', 'SUBS');
    member.addRole(role);
})

client.on("message", async message => {
  let blacklisted = ['word 1', 'word 2'];
  let foundInText = false;
  for (var i in blacklisted) {
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }
    if (foundInText) {
      message.delete();
      message.channel.send(`${message.author} Kalimat Kamu Merupakan Blacklisted Word, Pesanmu Dihapus`).then(m => m.delete({timeout: 15000})) // to reply if someone send blacklisted word
    }
})

client.on("message", async message => {
    if (message.author.bot) return;

    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

   if (command === "ping") {
   const m = await message.channel.send('Pinging...');
   message.delete().catch(O_o => {});
   m.edit   
     var embed = new Discord.MessageEmbed()
     .setColor(0x05ed4a)
     .setTitle("📡  **PING**  📡")
     .setDescription(`**Hasil Tes Ping !**\n\n⌛ ${m.createdTimestamp - message.createdTimestamp}ms.\n\n**Hasil Ping Dari:**\n${message.author}`)
     message.channel.send(embed);
    }
    
    if (command === "say") {
        message.delete().catch(O_o => {});
        if (!message.member.roles.cache.some(r => ["Your Administrator Roles"].includes(r.name))) // Example "La Reine ~", "Mon Amie ~", "BSD SQUAD", "MODS", "Mafia PEKANBARU", "Team Lalajo", "admin"
        return message.reply("Kamu Tidak Ada Akses Untuk Menggunakan Command Ini!");
      
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => {});
        message.channel.send(sayMessage);    }

    if (command === "kick") {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        message.delete().catch(O_o => {});
        if (!message.member.roles.cache.some(r => ["Your Administrator Roles"].includes(r.name))) // Example "La Reine ~", "Mon Amie ~", "BSD SQUAD", "MODS", "Mafia PEKANBARU", "Team Lalajo", "admin"
            return message.reply("Kamu Tidak Ada Akses Untuk Menggunakan Command Ini!");

        let member = message.mentions.members.first();
        if (!member)
            return message.reply("Harap sebutkan anggota yang valid dari server ini");
        if (!member.kickable)
            return message.reply("Aku Tidak Bisa Mengeluarkan Dia, Apakah Aku Punya Akses?");

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "Alasan Tidak Dimasukan";

        await member.kick(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
             var embed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle("👊 **KICK** 👊")
            .setDescription(`🧍 **User**\n${member.user.tag}\n\n🆔 **ID**\n${target.id}\n\n📝 **Karena**\n${reason}\n\n🕵️‍ **Admin**\n${message.author}`)
            message.channel.send(embed);

    }

    if (command === "ban") {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        message.delete().catch(O_o => {});
        if (!message.member.roles.cache.some(r => ["Your Administrator Roles"].includes(r.name))) // Example "La Reine ~", "Mon Amie ~", "BSD SQUAD", "MODS", "Mafia PEKANBARU", "Team Lalajo", "admin"
            return message.reply("Kamu Tidak Ada Akses Untuk Menggunakan Command Ini!");

        let member = message.mentions.members.first();
        if (!member)
            return message.reply("Harap sebutkan anggota yang valid dari server ini");
        if (!member.bannable)
            return message.reply("Aku Tidak Bisa Membanned Dia, Apakah Aku Punya Akses?");

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "Alasan Tidak Dimasukan";

        await member.ban(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
            var embed = new Discord.MessageEmbed()
             .setColor(0xff0000)
            .setTitle("🚫 **BANNED** 🚫")
            .setDescription(`🧍 **User**\n${member.user.tag}\n\n🆔 **ID**\n${target.id}\n\n📝 **Karena**\n${reason}\n\n🕵️‍ **Admin**\n${message.author}`)
            message.channel.send(embed);
    }

    if (command === "hapuspesan") {

        const deleteCount = parseInt(args[0], 10);

        if (!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Masukkan Jumlah Pesan Yang Ingin Di Delete Mulai Dari 2 - 100");

        const fetched = await message.channel.messages.fetch({ limit: deleteCount });
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Tidak Bisa Menghapus Pesan Karena: ${error}`));
    }
  
        if (command === "warn") {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        message.delete().catch(O_o => {});
        if (!message.member.roles.cache.some(r => ["Your Administrator Roles"].includes(r.name))) // Example "La Reine ~", "Mon Amie ~", "BSD SQUAD", "MODS", "Mafia PEKANBARU", "Team Lalajo", "admin"
            return message.reply("Kamu Tidak Ada Akses Untuk Menggunakan Command Ini!");

        let member = message.mentions.members.first();
        if (!member)
            return message.reply("Harap sebutkan anggota yang valid dari server ini");
        if (!member.bannable)
            return message.reply("Aku Tidak Bisa Memberikan Warning Kepada Dia, Apakah Aku Punya Akses?");

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "Alasan Tidak Dimasukan";

          var embed = new Discord.MessageEmbed()
          .setColor(0xedde05)
          .setTitle("⚠️ **WARNING** ⚠️")
          .setDescription(`🧍 **User**\n${member.user.tag}\n\n🆔 **ID**\n${target.id}\n\n📝 **Karena**\n${reason}\n\n🕵️‍ **Admin**\n${message.author}`)
          message.channel.send(embed);
          
    }

      if (command === "userinfo") {
      var embed = new Discord.MessageEmbed()
       .setAuthor("Informasi Account Discord", message.author.displayAvatarURL())
       .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
       .addField("Nama", `${message.author.username}#${message.author.discriminator}`)
       .addField("ID", message.author.id)
       .addField("Akun Dibuat Pada", `${moment(message.member.user.createdTimestamp).format('LT')}   **|**   ${moment(message.member.user.createdTimestamp).format('LL')}   **|**   ${moment(message.member.user.createdTimestamp).fromNow()}`)
       .setTimestamp()
       .setFooter("©️ 2020")
       message.channel.send(embed)
    }
  
      if (command === "serverinfo") {
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
            const members = message.guild.members.cache;
        const OnlineMembers = message.guild.members.cache.filter(member => member.presence.status !== "offline").map(member => member.user.username).join(", ");
        var embed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name}`, "Your Guild Profile Picture", message.guild.iconURL)
        .setThumbnail('Your Guild Profile Picture')
        .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
        .setURL(message.guild.URL)
        .addField(`ID SERVER`, message.guild.id, true)
        .addField(`OWNER SERVER`, message.guild.owner, true)
        .addField(`SERVER`, message.guild.region, true)
        .addField(`TOTAL MEMBER`, `${message.guild.memberCount}`, true)
        .addField(`JUMLAH ROLE`, `${roles.length}`, true)
        .setTimestamp()
        .setFooter("©️ 2020")
         message.channel.send(embed)
      }
  
  //announcement script

      if (command === "announce") {
        message.delete().catch(O_o => {});
        if (message.member.hasPermission("ADMINISTRATOR")) {
          const text = args.join(" ")
          if (text.length < 1) return message.channel.send("Silahkan Masukan Pesan");
          //const colour - args.slice(2).join("");
          var embed = new Discord.MessageEmbed()
          .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
          .setTitle("🚨 **ANNOUNCEMENT** 🚨")
          .setDescription(text);
          message.channel.send(embed);
          message.channel.send("@everyone")
        }
      }
  
      if (command === "meme") {
        const got = require('got'),
        {MessageEmbed} = require('discord.js');
        got('https://www.reddit.com/r/meme/random/.json').then(response => {
          let content = JSON.parse(response.body),
          image = content[0].data.children[0].data.url,
          embed = new MessageEmbed()
          .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
          .setImage(image)
          .setTimestamp()
          .setFooter('©️ 2020')
          message.channel.send(embed);
        }).catch(console.log)
      }
  
      if (command === "reaction-roles-embed") {
        let channel = client.channels.cache.get("Your Channel ID"); // We want to sent the embed, directly to this channel.
        const embed = new Discord.MessageEmbed()
        .setColor(0xfc1c03)
        .setTitle("✅ Ambil Role Kamu Disini ! ✅")
        .setDescription(`Yang Belum Mendapatkan Role **SUBS** Silahkan Klik Emote ✅ Dibawah`) // We're gonna try an unicode emoji. Let's find it on emojipedia.com !
        .setTimestamp()
        .setFooter("©️ 2020")
          channel.send(embed).then(async msg => {
          await msg.react("✅");
          // We're gonna using an await, to make the react are right in order.
        })
      }

      if (command === "report") {
        
        message.delete()
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!target) return message.channel.send("Harap sebutkan anggota yang valid dari server ini, Pesan Ini Akan Dihapus Dalam 15 Detik").then(m => m.delete({
        timeout: 15000}))
        
        let reason = args.slice(1).join(" ")
        if(!reason) return message.channel.send(`Tolong Masukan Alasan Yang Jelas Untuk Melaporkan **${target.user.tag}**`).then(m => m.delete({
        timeout: 15000}))
        let sChannel = client.channels.cache.get("Your Channel ID") // Your Report Message Channel

        message.channel.send("Laporan Sudah Dikirim Ke Admin, Pesan Ini Akan Dihapus Dalam 15 Detik, Terima Kasih").then(m => m.delete({
        timeout: 15000}))
          var embed = new Discord.MessageEmbed()
          .setColor(0xf29100)
          .setTitle("‼️ **REPORT** ‼️")
          .addField(`🧍 Report Dari`, message.author.tag)
          .addField(`🆔 ID`, message.author.id)
          .addField(`📝 Alasan`, reason)
          .addField(`🧛 Reported`, target.user.tag)
          .addField(`🆔 ID`, target.id)
          .setTimestamp()
          .setFooter("Report System LJV ©️ 2020")
          sChannel.send(embed)
          .then(function (message) {
          message.react("✅")
          message.react("❌")
          }).catch(function() {
        })  
      } 
    
      if(command === "status") {
      let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;
        var embed = new Discord.MessageEmbed()
        .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
        .setTitle("🤖  **BOT STATUS UPTIME**  🤖")
        .addField(`📅 Hari`, days)
        .addField(`🕑 Jam`, hours)
        .addField(`🕑 Menit`, minutes)
        .addField(`🕑 Detik`, seconds)
        .addField(`💾 Memory Usage`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
        .addField(`🔋 Status`, "Online")
        .setTimestamp()
        .setFooter("Status System LJV ©️ 2020")
        message.channel.send(embed);
      }

      if(command === "vote") {
        message.delete().catch(O_o => {});
        if (message.member.hasPermission("ADMINISTRATOR")) {
          const text = args.join(" ")
          if (text.length < 1) return message.channel.send("Silahkan Masukan Pesan");
          //const colour - args.slice(2).join("");
          var embed = new Discord.MessageEmbed()
          .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
          .setTitle("📝 **VOTING** 📝")
          .setDescription(text)
          .setTimestamp()
          .setFooter("Polling System LJV ©️ 2020")
        message.channel.send(embed)
        .then(function (message) {
          message.react("✅")
          message.react("❌")
        }).catch(function() {
      })  
      }
    message.channel.send("@everyone")
  }

  //livestream announcement script

  if (command === "live") {
    message.delete().catch(O_o => {});
    if (message.member.hasPermission("ADMINISTRATOR")) {
      const text = args.join(" ")
      //const colour - args.slice(2).join("");
      var embed = new Discord.MessageEmbed()
      .setColor(0xFF1493)
       //.setTitle("🚨 **STREAM ALERT** 🚨")
      .setDescription(`Your Link Platform Live Streaming`)
      .setImage('Your Link Banner ')
      .setTimestamp()
      .setFooter("©️ 2021");
      message.channel.send("@everyone ```css\nYour Description Text```", embed);
      //message.channel.send(embed);
    }
  } 
});

// welcome message
client.on('guildMemberAdd', member => {
    
  var guilds = client.guilds.cache.get("Your Guild ID");
  var channel = client.channels.cache.get("Your Channel ID");

  var embed = new Discord.MessageEmbed()
    .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
    .setTitle("✨ Welcome ✨")
    .setDescription(`Hi **${member.user.tag}**, Your Welcome Message`)
    .setImage('Your Link Banner');
  channel.send({embed});
});

client.on("messageReactionAdd", async (reaction, user) => {
  // If a message gains a reaction and it is uncached, fetch and cache the message.
  // You should account for any errors while fetching, it could return API errors if the resource is missing.
  if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
  if (reaction.partial) await reaction.fetch();
  
  if (user.bot) return; // If the user was a bot, return.
  if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
  if (reaction.message.guild.id !== "Your Guild ID") return; // Use this if your bot was only for one server/private server.
  
  if (reaction.message.channel.id === "Your Channel ID") { // This is a #self-roles channel.
        if (reaction.emoji.name === "✅") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("494183083629740071"); // Roblox role.
      return user.send("Your Message").catch(() => console.log("Failed to send DM."));
    }
  } else {
    return; // If the channel was not a #self-roles, ignore them.
  }
})

client.on("messageReactionRemove", async (reaction, user) => {
  
  // We're gonna make a trigger, if the user remove the reaction, the bot will take the role back.
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.guild.id !== "Your Channel ID") return;
  
  if (reaction.message.channel.id === "Your Channel ID") {
        if (reaction.emoji.name === "✅") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("494183083629740071"); // Roblox role.
      return user.send("Your Message").catch(() => console.log("Failed to send DM."));
    }
  } else {
    return;
  }
})

// Check every 5 seconds for changes

setInterval(function() {

// update member

// now you can log computers to find out what you wanna do with it next.
let guild = client.guilds.cache.get("Your Guild ID");
let memberCount = guild.memberCount
let memberCountChannel = client.channels.cache.get("Your Voice Channel ID For User Count")
let botCountChannel = client.channels.cache.get("Your Voice Channel ID For Bots Count");
  
const userCount = guild.members.cache.filter(member => !member.user.bot).size;
memberCountChannel.setName(`〘👤〙User: ${memberCount}`)
  
const botCount = guild.members.cache.filter(member => member.user.bot).size;
botCountChannel.setName(`〘🤖〙Bot: ${botCount}`)
}, 5000);

client.login(config.token, 'reconnect=True', 'bot=True'); 
