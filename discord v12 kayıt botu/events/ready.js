const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
var oyun = [
  'D Code Youtube',
  'Abone OL!',
  'Beğen!',
  'Yorum At!',
  'https://www.youtube.com/c/DCodetr',
''

    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setActivity(oyun[random], `${client.users.size} Users` );
        }, 2 * 2500);

  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Bot aktif edildi D CODE YT!`);
  client.user.setStatus("online");
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Komutlar yüklendi D CODE YT!`);};