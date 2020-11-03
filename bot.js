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
const format = require("moment-duration-format");
const db = require("quick.db");
const config = require("./config.json");
const Date = require("new-date");
const moment = require('moment');
const { Command } = require('discord.js-commando')
client.on('ready', () => console.log(`Logged in as ${client.user.tag}.`));

client.on('ready', () => {
    console.log('Bot Lalajovers Sudah Menyala');
    client.user.setActivity('Ayam Kampus', { type: 'WATCHING'});
});

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
        if (!message.member.roles.cache.some(r => ["La Reine ~", "Mon Amie ~", "BSD SQUAD", "MODS", "Mafia PEKANBARU", "Team Lalajo", "admin"].includes(r.name)))
        return message.reply("Kamu Tidak Ada Akses Untuk Menggunakan Command Ini!");
      
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => {});
        message.channel.send(sayMessage);    }

    if (command === "kick") {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        message.delete().catch(O_o => {});
        if (!message.member.roles.cache.some(r => ["La Reine ~", "Mon Amie ~", "BSD SQUAD", "MODS", "Mafia PEKANBARU", "Team Lalajo", "admin"].includes(r.name)))
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
        if (!message.member.roles.cache.some(r => ["La Reine ~", "Mon Amie ~", "BSD SQUAD", "MODS", "Mafia PEKANBARU", "Team Lalajo", "admin"].includes(r.name)))
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
        if (!message.member.roles.cache.some(r => ["La Reine ~", "Mon Amie ~", "BSD SQUAD", "MODS", "Mafia PEKANBARU", "Team Lalajo", "admin"].includes(r.name)))
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
        .setFooter("LALAJOVERS ©️ 2020")
        message.channel.send(embed)
    }
  
  if (command === "serverinfo") {
    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
    const OnlineMembers = message.guild.members.cache.filter(member => member.presence.status !== "offline").map(member => member.user.username).join(", ");
    var embed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name}`, "https://images-ext-2.discordapp.net/external/cdyBBW_pON0iBBMN-zKzj693R6hg6Xa6HyYUbJ7FQZI/%3Fsize%3D128/https/cdn.discordapp.com/icons/493895395987030030/82da5579dff96e4c22a7e2cfbab2f13e.png?width=102&height=102", message.guild.iconURL)
    .setThumbnail('https://images-ext-2.discordapp.net/external/cdyBBW_pON0iBBMN-zKzj693R6hg6Xa6HyYUbJ7FQZI/%3Fsize%3D128/https/cdn.discordapp.com/icons/493895395987030030/82da5579dff96e4c22a7e2cfbab2f13e.png?width=102&height=102')
    .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
    .setURL(message.guild.URL)
    .addField(`ID SERVER`, message.guild.id, true)
    .addField(`OWNER SERVER`, message.guild.owner, true)
    .addField(`SERVER`, message.guild.region, true)
    .addField(`TOTAL MEMBER`, `${message.guild.memberCount}`, true)
    .addField(`JUMLAH ROLE`, `${roles.length}`, true)
    .setTimestamp()
    .setFooter("LALAJOVERS ©️ 2020")
     message.channel.send(embed)
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
      .setFooter('LALAJOVERS ©️ 2020')
      message.channel.send(embed);
    }).catch(console.log)
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
          message.channel.send("@everyone")
          message.channel.send(embed);
        }
      }

  if (command === "report") {
    
        message.delete()
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!target) return message.channel.send("Harap sebutkan anggota yang valid dari server ini, Pesan Ini Akan Dihapus Dalam 15 Detik").then(m => m.delete({
    timeout: 15000}))
    
    let reason = args.slice(1).join(" ")
    if(!reason) return message.channel.send(`Tolong Masukan Alasan Yang Jelas Untuk Melaporkan **${target.user.tag}**`).then(m => m.delete({
    timeout: 15000}))
    let sChannel = client.channels.cache.get("745661142298394664")

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
        .setTitle("🤖  **BOT STATUS**  🤖")
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
  
    if (command === "reaction-roles-embed") {
    let channel = client.channels.cache.get("725978189566050347"); // We want to sent the embed, directly to this channel.
    const embed = new Discord.MessageEmbed()
    .setColor(0xfc1c03)
    .setTitle("✅ Ambil Role Kamu Disini ! ✅")
    .setDescription(`1️⃣ Team 1\n\n2️⃣ Team 2\n\n3️⃣ Team 3\n\n4️⃣ Team 4\n\n5️⃣ Team 5\n\n6️⃣ Team 6\n\n7️⃣ Team 7\n\n8️⃣ Team 8\n\n9️⃣ Team 9\n\n🔟 Team 10\n\n🔴 Team 11\n\n🟠 Team 12\n\n🟡 Team 13\n\n🟢 Team 14\n\n🔵 Team 15\n\n🟣 Team 16\n\n🟤 Team 17\n\n⚫ Team 18\n\n⚪ Team 19\n\n🔶 Team 20`) // We're gonna try an unicode emoji. Let's find it on emojipedia.com !
    .addField(`Cara Penggunaan`, "Klik Emoticon Sesuai Emotion Yang Ada Di Samping Nomor Team Masing-Masing, 1 User Hanya Boleh Mengambil 1 Role, Apabila Bingung, Silahkan Bertanya Di <#499840153661997059>\n\nApa Bila Salah Mengambil Role, Klik Kembali Emoticon Team Yang Salah, Kemudian Klik Emoticon Team Yang Benar")
    .setTimestamp()
    .setFooter("LALAJO EVENT ©️ 2020")
    channel.send(embed).then(async msg => {
      await msg.react("1️⃣");
      await msg.react("2️⃣");
      await msg.react("3️⃣");
      await msg.react("4️⃣");
      await msg.react("5️⃣");
      await msg.react("6️⃣");
      await msg.react("7️⃣");
      await msg.react("8️⃣");
      await msg.react("9️⃣");
      await msg.react("🔟");
      await msg.react("🔴");
      await msg.react("🟠");
      await msg.react("🟡");
      await msg.react("🟢");
      await msg.react("🔵");
      await msg.react("🟣");
      await msg.react("🟤");
      await msg.react("⚫");
      await msg.react("⚪");
      await msg.react("🔶");
      // We're gonna using an await, to make the react are right in order.
    })
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
  
});

//bot join to voice script

client.on("ready", () => {
    const channel = client.channels.cache.get("501292545620443136");
    if (!channel) return console.error("Saluran tidak ada!");
    channel.join().then(connection => {
        console.log("Berhasil terhubung.");
    }).catch(e => {
        console.error(e);
    });
});

//verification System

const completemsg = `Terima kasih telah menyetujui aturan dan kode etik! Anda sekarang adalah anggota guild yang terverifikasi! \nJangan ragu untuk memilih peran apa yang Anda sukai, perkenalkan diri Anda atau lihat saluran kami yang lain. \n\n**Token unik Anda adalah tanda tangan yang telah Anda baca dan pahami aturan kami.**\n`

const shortcode = (n) => {
    const possible = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghjklmnopqrstuvwxyz0123456789'
    let text = ''
    for (var i = 0; i < n + 1; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text;
}

client.on('guildMemberAdd', (member) => {
    if (member.user.bot || member.guild.id !== config.guild) return
    const token = shortcode(8)
    const welcomemsg = `Selamat datang di Server **LALAJOVERS**! Kami harap Anda menemukan rumah di sini! Lihat \<#499840153661997059>\ saluran untuk memastikan bahwa kami hidup, dan selama tujuan kami sama, maka ada tempat di meja menunggu Anda. \n\n Jika Anda menerima kode etik, harap verifikasi perjanjian Anda dengan membalas ** DM ini ** dengan frasa verifikasi: \n\n\`\`\`Saya setuju untuk mematuhi semua aturan. Token saya adalah ${token}.\`\`\`\n\n**Pesan ini peka terhadap huruf besar-kecil, dan harap sertakan periode di akhir! ** \n\nPertanyaan? Dapatkan di anggota staf di server atau melalui DM.`
    console.log(`${member.user.username}#${member.user.discriminator} joined! CODE: "${token}"`)
    member.send(welcomemsg)
    member.user.token = token
})

const verifymsg = 'Saya setuju untuk mematuhi semua aturan. Token saya adalah {token}.'

client.on('message', (message) => {
    if (message.author.bot || !message.author.token || message.channel.type !== `dm`) return
    if (message.content !== (verifymsg.replace('{token}', message.author.token))) return
    message.channel.send({
        embed: {
            color: Math.floor(Math.random() * (0xFFFFFF + 1)),
            description: completemsg,
            timestamp: new Date(),
            footer: {
                text: `LALAJOVERS Verification System`
            }
        }
    })
    client.guilds.cache.get(config.guild).member(message.author).roles.add(config.role) // ensure this is a string in the config ("")
        .then(console.log(`TOKEN: ${message.author.token} :: Role ${config.role} added to member ${message.author.id}`))
        .catch(console.error)
})

// welcome message

client.on('guildMemberAdd', member => {
  
  var guilds = client.guilds.cache.get("493895395987030030")
  var channel = client.channels.cache.get("723434764660375603");

  var embed = new Discord.MessageEmbed()
    .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
    .setTitle("✨ Welcome ✨")
    .setDescription(`Hai ${member.user.tag}, Selamat Datang Di Discord Lalajovers, Silahkan Baca <#495629044243759124> Terlebih Dahulu Yaa, Have Fun And Have A Nice Day, Merci Beaucoup`)
    .setImage('https://www.gambaranimasi.org/data/media/707/animasi-bergerak-selamat-datang-0031.gif');
  channel.send({embed});
}); 

client.on("messageReactionAdd", async (reaction, user) => {
  // If a message gains a reaction and it is uncached, fetch and cache the message.
  // You should account for any errors while fetching, it could return API errors if the resource is missing.
  if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
  if (reaction.partial) await reaction.fetch();
  
  if (user.bot) return; // If the user was a bot, return.
  if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
  if (reaction.message.guild.id !== "499840153192366081") return; // Use this if your bot was only for one server/private server.
  
  if (reaction.message.channel.id === "725978189566050347") { // This is a #self-roles channel.
        if (reaction.emoji.name === "1️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750844155691008"); // Roblox role.
      return user.send("Role Team 1 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "2️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750897549312031"); // Roblox role.
      return user.send("Role Team 2 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "3️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750844155691008"); // Roblox role.
      return user.send("Role Team 3 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "4️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750897549312031"); // Roblox role.
      return user.send("Role Team 4 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "5️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750844155691008"); // Roblox role.
      return user.send("Role Team 5 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "6️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750897549312031"); // Roblox role.
      return user.send("Role Team 6 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "7️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750844155691008"); // Roblox role.
      return user.send("Role Team 7 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "8️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750897549312031"); // Roblox role.
      return user.send("Role Team 8 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "9️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750844155691008"); // Roblox role.
      return user.send("Role Team 9 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🔟") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750897549312031"); // Roblox role.
      return user.send("Role Team 10 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🔴") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750844155691008"); // Roblox role.
      return user.send("Role Team 11 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🟠") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750844155691008"); // Roblox role.
      return user.send("Role Team 12 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🟡") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750897549312031"); // Roblox role.
      return user.send("Role Team 13 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🟢") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750844155691008"); // Roblox role.
      return user.send("Role Team 14 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🔵") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750897549312031"); // Roblox role.
      return user.send("Role Team 15 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🟣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750844155691008"); // Roblox role.
      return user.send("Role Team 16 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🟤") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750897549312031"); // Roblox role.
      return user.send("Role Team 17 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "⚫") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750844155691008"); // Roblox role.
      return user.send("Role Team 18 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "⚪") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750897549312031"); // Roblox role.
      return user.send("Role Team 19 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🔶") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("751750844155691008"); // Roblox role.
      return user.send("Role Team 20 Sudah Ditambahkan").catch(() => console.log("Failed to send DM."));
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
  if (reaction.message.guild.id !== "499840153192366081") return;
  
  if (reaction.message.channel.id === "725978189566050347") {
        if (reaction.emoji.name === "1️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750844155691008"); // Roblox role.
      return user.send("Role Team 1 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "2️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750897549312031"); // Roblox role.
      return user.send("Role Team 2 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "3️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750844155691008"); // Roblox role.
      return user.send("Role Team 3 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "4️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750897549312031"); // Roblox role.
      return user.send("Role Team 4 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "5️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750844155691008"); // Roblox role.
      return user.send("Role Team 5 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "6️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750897549312031"); // Roblox role.
      return user.send("Role Team 6 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "7️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750844155691008"); // Roblox role.
      return user.send("Role Team 7 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "8️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750897549312031"); // Roblox role.
      return user.send("Role Team 8 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "9️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750844155691008"); // Roblox role.
      return user.send("Role Team 9 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🔟") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750897549312031"); // Roblox role.
      return user.send("Role Team 10 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🔴") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750844155691008"); // Roblox role.
      return user.send("Role Team 11 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🟠") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750844155691008"); // Roblox role.
      return user.send("Role Team 12 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🟡") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750897549312031"); // Roblox role.
      return user.send("Role Team 13 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🟢") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750844155691008"); // Roblox role.
      return user.send("Role Team 14 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🔵") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750897549312031"); // Roblox role.
      return user.send("Role Team 15 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🟣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750844155691008"); // Roblox role.
      return user.send("Role Team 16 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🟤") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750897549312031"); // Roblox role.
      return user.send("Role Team 17 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "⚫") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750844155691008"); // Roblox role.
      return user.send("Role Team 18 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "⚪") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750897549312031"); // Roblox role.
      return user.send("Role Team 19 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }
        if (reaction.emoji.name === "🔶") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("751750844155691008"); // Roblox role.
      return user.send("Role Team 20 Sudah Dilepas").catch(() => console.log("Failed to send DM."));
    }  
  } else {
    return;
  }
})

// Check every 30 seconds for changes
setInterval(function() {
  console.log('Member Count Dimulai')

// update member
let guild = client.guilds.cache.get("499840153192366081");
let memberCount = guild.memberCount
let memberCountChannel = client.channels.cache.get("752509009289805884")
let botCountChannel = client.channels.cache.get("752509038863974533");
  
const userCount = guild.members.cache.filter(member => !member.user.bot).size  
memberCountChannel.setName(`〘👤〙Jumlah User: ${memberCount}`)
  
const botCount = guild.members.cache.filter(member => member.user.bot).size  
botCountChannel.setName(`〘🤖〙Jumlah Bot: ${botCount}`)
}, 15000);

client.login(config.token);
