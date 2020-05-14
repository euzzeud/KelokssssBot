const Discord = require("discord.js")
const bot = new Discord.Client()
const config = require("./config.json")

bot.on('ready', function () {
    console.log(`Le bot est maintenant en ligne. ➔ ${bot.user.tag}.`)

bot.user.setActivity(`commande ${config.prefix}help`, {type: "WATCHING"})


bot.fetchApplication().then(async app => {
    let tagOwner = app.owner.tag
    let avatarOwner = app.owner.displayAvatarURL()
    let idOwner = app.owner.id

bot.on("guildMemberAdd", member => {

    let channel = config.channels.welcome

    if (!channel){
        return;
    }
    let hello = new Discord.MessageEmbed()
    .setAuthor(`Souhaitons la bienvenue à ${member.user.tag} !`, member.user.displayAvatarURL())
    .setDescription(`Salut <@${member.user.id}> ! Bienvenue sur __${member.guild.name}__. J'espère que tu passeras un bon moment parmis nous ! \n A bientôt ! :grinning:`)
    .setColor(config.color)
    .setFooter(`${member.guild.name}`, member.guild.iconURL())
    .setTimestamp()
    member.guild.channels.cache.get(channel).send(hello)
})

bot.on("guildMemberRemove", member => {
    let channel = config.channels.goodbye

    if (!channel){
        return;
    }

    let goodbye = new Discord.MessageEmbed()
    .setAuthor(`Un membre est parti !`, member.user.displayAvatarURL())
    .setDescription(`**${member.user.tag}** nous a quitté... :tired_face:`)
    .setColor(config.color)
    .setFooter(`${member.guild.name}`, member.guild.iconURL())
    .setTimestamp()

    member.guild.channels.cache.get(channel).send(goodbye)
})

    bot.on('message', async message => {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
    
    
        if (message.author.bot) return;
        if (!message.content.startsWith(config.prefix)) return;
        if (message.channel.type === "dm") return;

if (command === "help"){
    let helpEmbed = new Discord.MessageEmbed()
    .setTitle(`Menu d'aide de ${bot.user.username}`)
    .setDescription(`Voici la liste de mes commandes.`)
    .setColor(config.color)
    .addField(`\`${config.prefix}help\``, `Afficher la liste des commande de ${bot.user.username}.`)
    .addField(`\`${config.prefix}ping\``, `Afficher la latence de l'API.`)
    .addField(`\`${config.prefix}kick @mention (raison)\``, `Expulser un membre du serveur.`)
    .addField(`\`${config.prefix}ban @mention (raison)\``, `Bannir un membre du serveur.`)
    .addField(`\`Fonctions\``, `Message de bienvenue & Message d'au revoir`)
    .addField(`Client`, `Kelokssss#0791`, true)
    .addField(`Developpeur`, `${tagOwner}`, true)
    .addField(`Serveur de support`, `[Rejoindre](https://discord.gg/B94mQV8)`, true)
    .setFooter(`${tagOwner} | Développeur JS, HTML et CSS`, avatarOwner)

    let confirmEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
    .setDescription(`**:white_check_mark: Le menu d'aide vous a été envoyer en MP.**`)
    .setColor(config.color)

    message.author.send(helpEmbed)
    message.channel.send(confirmEmbed)
}

if (command === "ping"){
    let ping = bot.ws.ping

    message.reply(`:ping_pong: Pong ! (**${ping} ms**)`)
}

if (command === "kick"){
    let kickMember = message.mentions.members.first()

    let NoMember = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
    .setColor(config.color)
    .setDescription(`**:x: Vous devez mentionner un membre.**`)

    if (!kickMember) { return message.channel.send(NoMember)}

    let raison = args.slice(1).join(" ")
    if (!raison) { raison = "Aucune raison"}

    let imposibleEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
    .setColor(config.color)
    .setDescription(`**:x: Imposible d'expulser ce membre.**`)


    if (kickMember.id === message.author.id) { return message.channel.send(imposibleEmbed)}
    if (message.guild.member(kickMember).hasPermission(["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_GUILD"])) { return message.channel.send(imposibleEmbed)}

    kickMember.kick()

    let confirmEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
    .setColor(config.color)
    .setDescription(`**:white_check_mark: L'utilisateur \`${kickMember.user.tag}\` a été expulser par \`${message.author.tag}\` pour ${raison.toLowerCase()}.**`)
    message.channel.send(confirmEmbed)
}

if (command === "ban"){
    let banMember = message.mentions.members.first()

    let NoMember = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
    .setColor(config.color)
    .setDescription(`**:x: Vous devez mentionner un membre.**`)

    if (!banMember) { return message.channel.send(NoMember)}

    let raison = args.slice(1).join(" ")
    if (!raison) { raison = "Aucune raison"}

    let imposibleEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
    .setColor(config.color)
    .setDescription(`**:x: Imposible d'expulser ce membre.**`)


    if (banMember.id === message.author.id) { return message.channel.send(imposibleEmbed)}
    if (message.guild.member(banMember).hasPermission(["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_GUILD"])) { return message.channel.send(imposibleEmbed)}

    banMember.ban({reason: raison})

    let confirmEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
    .setColor(config.color)
    .setDescription(`**:white_check_mark: L'utilisateur \`${banMember.user.tag}\` a été banni par \`${message.author.tag}\` pour ${raison.toLowerCase()}.**`)
    message.channel.send(confirmEmbed)
}

})
})
})

bot.login(config.token)