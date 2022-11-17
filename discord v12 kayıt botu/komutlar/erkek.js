              
const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
   if(!message.member.roles.cache.has('YETKİLİROLİD')) return message.channel.send({ content: `**:x: Bu Komutu Kullanabilmek İçin Kayıt Sorumlusu Yetkisine Sahip Olman Lazım**` })
   const Discord = require("discord.js");

     let member = message.mentions.members.first();
     let isim = args.slice(1).join(" ");
     let yas = args.slice(1).join(" ");
     if (!member) return message.channel.send(":x: Bir Üye Etiketlemelisin!");
     if (!isim) return message.channel.send(":x: Bir İsim Yazmalısın!");
     member.setNickname(`${isim}`);
     member.roles.remove('alınanrol')
     member.roles.add('verilenrol')
   const embed = new Discord.MessageEmbed()
   
   
         .addField(`**🏷 D Code Youtube Kayıt 🏷**`,
         `\n**🔸️Kayıt Edilen Kullanıcı:** ${member.user} \n🔸️**Kayıt Eden Yetkili:** \`${message.author.username}\``)
   client.channels.cache.get('log').send(embed)
   };
   
   exports.conf = {
     enabled: true,
     guildOnly: true,
     aliases: ["e"],
     permLevel: 0
   };
   exports.help = {
     name: "erkek",
     description: "D code kayıt sistemi LİSANSLI",
     usage: "D CODE KAYIT SİSTEMİ"
   };