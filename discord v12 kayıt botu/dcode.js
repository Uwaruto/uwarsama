const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
require('./util/eventLoader.js')(client);
const fs = require('fs');
const  db  = require('quick.db');
const moment = require('moment');
const chalk = require('chalk');
//// D CODE YOUTUBE
var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
//////////////////////////KOMUTLAR//////////////////KOMUTLAR///////////////KOMUTLAR KOMUTLAR//////////////////////////KOMUTLAR KOMUTLAR///////////////// 
  //////ETIKETLENINCE PREFIX////
  
  client.on("message", msg => {
      //let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
      const westrabumbe = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`**Prefixim: ${prefix}**\n **Yapımcım : <@477878514629083137> **`)
    if (msg.content.includes(`<@${client.user.id}>`) || msg.content.includes(`<@!${client.user.id}>`)) {
      msg.channel.send(westrabumbe);
    }
  });
  
////////////////ETİKETLENİNCE PREFİX /////////////////

///Modlog

client.on('channelCreate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`modlog${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Kanal oluşturuldu`, `Kanal İsmi: \`${channel.name}\`\n Kanal Türü: **${channel.type}**\nKanal ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("#ff0000")
  .setImage("https://cdn.discordapp.com/attachments/927899618228969492/949625753220300830/deathh-bot-banner.png")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`modlog${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.MessageEmbed()
                    .addField(`Kanal silindi`, `Silinen Kanal İsmi: \`${channel.name}\`\nSilinen Kanal Türü: **${channel.type}**\nSilinen Kanal ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("#ff0000")
  .setImage("https://cdn.discordapp.com/attachments/927899618228969492/949625753220300830/deathh-bot-banner.png")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(embed)
});

   client.on('channelNameUpdate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`modlog${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Kanal İsmi değiştirildi`, ` Yeni İsmi: \`${channel.name}\`\nKanal ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("#ff0000")
  .setImage("https://cdn.discordapp.com/attachments/927899618228969492/949625753220300830/deathh-bot-banner.png")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});




client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`modlog${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji oluşturuldu`, ` İsmi: \`${emoji.name}\`\n Gif?: **${emoji.animated}**\nEmoji ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("#ff0000")
  .setImage("https://cdn.discordapp.com/attachments/927899618228969492/949625753220300830/deathh-bot-banner.png")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`modlog${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji silindi`, ` İsmi: \`${emoji.name}\`\n Gif? : **${emoji.animated}**\nSilinen Emoji ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("#ff0000")
  .setImage("https://cdn.discordapp.com/attachments/927899618228969492/949625753220300830/deathh-bot-banner.png")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.cache.get(db.fetch(`modlog${newEmoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji güncellendi`, ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\nEmoji ID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("#ff0000")
  .setImage("https://cdn.discordapp.com/attachments/927899618228969492/949625753220300830/deathh-bot-banner.png")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)

    c.send(embed)
    });

client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.cache.get(db.fetch(`modlog${message.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
                    .setAuthor(`Silen Kişi: ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
                    .setTitle("Mesaj silindi")                
                    .addField(`Silinen mesaj : ${message.content}`,`Silindiği Kanal: ${message.channel.name}`)
                    .setTimestamp()
                    .setColor("#ff0000")
  .setImage("https://cdn.discordapp.com/attachments/927899618228969492/949625753220300830/deathh-bot-banner.png")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    channel.send(embed)
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.cache.get(db.fetch(`modlog${oldMessage.guild.id}`));
    if(!channel) return;

    let embed = new Discord.MessageEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ",`${oldMessage.content}`)
    .addField("Yeni mesaj : ",`${newMessage.content}`)
    .addField(`Kanal : ${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("#ff0000")
    .setImage("https://cdn.discordapp.com/attachments/927899618228969492/949625753220300830/deathh-bot-banner.png")
    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`)

    channel.send(embed)
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`modlog${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Rol oluşturuldu`, `Rol ismi: \`${role.name}\`\nRol ID: ${role.id}`)                    
.setTimestamp()
.setColor("#ff0000")
.setImage("https://cdn.discordapp.com/attachments/927899618228969492/949625753220300830/deathh-bot-banner.png")
.addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`modlog${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Rol silindi`, `Silinen Rol ismi: \`${role.name}\`\nSilinen Rol ID: ${role.id}`)                    
.setTimestamp()
.setColor("#ff0000")
.setImage("https://cdn.discordapp.com/attachments/927899618228969492/949625753220300830/deathh-bot-banner.png")

    .addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
})

 
//Modlog Son

/////////////////////sa-as
client.on('message', async (msg) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa'){
          
        msg.reply(' Aleyküm Selam | Hoş geldin ');    
      }
      }
    });

client.on('message', async (msg) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 's.a.'){
          
        msg.reply(' Aleyküm Selam | Hoş geldin ');    
      }
      }
    });

    client.on('message', async (msg) => {
      let i = await  db.fetch(`saas_${msg.guild.id}`)
          if(i === 'açık') {
            if (msg.content.toLowerCase() === 'sea'){
              
            msg.reply(' Aleyküm Selam | Hoş geldin ');    
          }
          }
        });

        client.on('message', async (msg) => {
          let i = await  db.fetch(`saas_${msg.guild.id}`)
              if(i === 'açık') {
                if (msg.content.toLowerCase() === 'Sa'){
                  
                msg.reply(' Aleyküm Selam | Hoş geldin ');    
              }
              }
            });

            client.on('message', async (msg) => {
              let i = await  db.fetch(`saas_${msg.guild.id}`)
                  if(i === 'açık') {
                    if (msg.content.toLowerCase() === 'Selam'){
                      
                    msg.reply(' Aleyküm Selam | Hoş geldin ');    
                  }
                  }
                });

                client.on('message', async (msg) => {
                  let i = await  db.fetch(`saas_${msg.guild.id}`)
                      if(i === 'açık') {
                        if (msg.content.toLowerCase() === 'selam'){
                          
                        msg.reply(' Aleyküm Selam | Hoş geldin ');    
                      }
                      }
                    });
            

                    client.on('message', async (msg) => {
                      let i = await  db.fetch(`saas_${msg.guild.id}`)
                          if(i === 'açık') {
                            if (msg.content.toLowerCase() === 'Selam'){
                              
                            msg.reply(' Aleyküm Selam | Hoş geldin ');    
                          }
                          }
                        });
                
                        client.on('message', async (msg) => {
                          let i = await  db.fetch(`saas_${msg.guild.id}`)
                              if(i === 'açık') {
                                if (msg.content.toLowerCase() === 'SELAM'){
                                  
                                msg.reply(' Aleyküm Selam | Hoş geldin ');    
                              }
                              }
                            });

                            client.on('message', async (msg) => {
                              let i = await  db.fetch(`saas_${msg.guild.id}`)
                                  if(i === 'açık') {
                                    if (msg.content.toLowerCase() === 'selamın aleyküm'){
                                      
                                    msg.reply(' Aleyküm Selam | Hoş geldin ');    
                                  }
                                  }
                                });
                        
                                client.on('message', async (msg) => {
                                  let i = await  db.fetch(`saas_${msg.guild.id}`)
                                      if(i === 'açık') {
                                        if (msg.content.toLowerCase() === 'Selamın Aleyküm'){
                                          
                                        msg.reply(' Aleyküm Selam | Hoş geldin ');    
                                      }
                                      }
                                    });
                            
                                    client.on('message', async (msg) => {
                                      let i = await  db.fetch(`saas_${msg.guild.id}`)
                                          if(i === 'açık') {
                                            if (msg.content.toLowerCase() === 'Selamın aleyküm'){
                                              
                                            msg.reply(' Aleyküm Selam | Hoş geldin ');    
                                          }
                                          }
                                        });
                                
                                        client.on('message', async (msg) => {
                                          let i = await  db.fetch(`saas_${msg.guild.id}`)
                                              if(i === 'açık') {
                                                if (msg.content.toLowerCase() === 'Selamınaleyküm'){
                                                  
                                                msg.reply(' Aleyküm Selam | Hoş geldin ');    
                                              }
                                              }
                                            });
                                    

                                            client.on('message', async (msg) => {
                                              let i = await  db.fetch(`saas_${msg.guild.id}`)
                                                  if(i === 'açık') {
                                                    if (msg.content.toLowerCase() === 'selamınaleyküm'){
                                                      
                                                    msg.reply(' Aleyküm Selam | Hoş geldin ');    
                                                  }
                                                  }
                                                });
                                        
////////////////////////sa-as bitiş


////////// reklam enngel ////////////////
//REKLAM ENGEL

client.on("message", msg => {
  const veri = db.fetch(`${msg.guild.id}.reklam`);
  if (veri) {
    const reklam = [
      ".com",
      ".net",
      ".xyz",
      ".xxx",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      ".gl",
      ".org",
      ".tr",
      ".com.tr",
      ".ml",
      ".org",
      ".site",
      ".biz",
      ".net",
      ".rf.gd",
      ".az",
      ".party",
      ".tv",
      "discord.gg",
      "youtube.com"
    ];
    if (reklam.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.permissions.has("BAN_MEMBERS")) {
          msg.delete();
          return msg
            .reply("Yakaladım Seni! Reklam Yasak.")
            .then(wiskyx => wiskyx.delete({ timeout: 5000 }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!veri) return;
});

//REKLAM ENGEL

///////////////////// reklam engel /////////////


//-------------------- Küfür Engel Sistemi --------------------//

client.on("message", async msg => {
  const i = await db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq",
      "fuck",
      "pussy",
      "dick",
      "ass",
      "cu",
      "aq",
      "mq",
      "oç",
      "camcı",
      "cum",
      
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.permissions.has("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("Heey! Küfür Yasak. | DEATHH BOT ")
            .then(wiskyx => wiskyx.delete({ timeout: 5000 }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("messageUpdate", async msg => {
  const i = db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "ass",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq",
      "fuck",
      "pussy",
      "dick"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.permissions.has("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("Yakaladım Seni! Küfür Yasak.")
            .then(wiskyx => wiskyx.delete({ timeout: 5000 }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

//KÜFÜR ENGEL SON

//////////////////////////KayıtSistemi/////////////////////DTH TEAM UPDATE VERSİON V1.5 ELİTE

client.on('guildMemberAdd', async(member) => {
  let kayitkanali = await db.fetch(`kayitkanali_${member.guild.id}`);
  let kayithosgeldinmesaji = await db.fetch(`kayithosgeldinmesaji_${member.guild.id}`);
  try {
    if(client.channels.cache.has(kayitkanali)) { await client.channels.cache.get(kayitkanali).send(kayithosgeldinmesaji.replace('(uye)', member)) };
  } catch(err) { }
});

///////////////////////////////////////////////////////////DTH TEAM UPDATE VERSİON V1.5 ELİTE



///DİL SİSTEMİ V2
//DİL SİSTEMİ V2

