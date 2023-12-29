// Importamos la librería discord.js para interactuar con la API de Discord.
const Discord = require('discord.js');

// Importamos el CommandManager de 'bot-discord-tools', que es una libreria de gestion
const { CommandManager } = require('bot-discord-tools');

// Importamos la configuración desde un archivo externo (config.json).
const CONFIG = require('./config.json');

// Creamos una instancia del cliente de Discord, configurando ciertos intents.
const client = new Discord.Client({
    intents: ['Guilds', 'MessageContent', 'GuildMessages', 'GuildMembers']
});

// Creamos una instancia de CommandManager para gestionar comandos.
const command = new CommandManager();

// Definimos el prefijo por defecto para los comandos usando la configuración.
command.definirPrefijoPorDefecto(CONFIG.prefix);

// Agregamos comandos de ejemplo: "ping" y "membercount".
command.agregarComando({
    nombre: "ping",
    ejecutar: (message, args) => {
        // Responde con "pong" al comando "!ping".
        message.reply("pong");
    }
});

command.agregarComando({
    nombre: "membercount",
    ejecutar: (message, args) => {
        // Responde con la cantidad de miembros en el servidor.
        message.reply(`En el servidor hay ${message.guild.memberCount} miembros`);
    }
});

// Evento que se dispara cuando se recibe un nuevo mensaje.
client.on('messageCreate', (message) => {
    // Verificamos si el mensaje no comienza con el prefijo o si fue enviado por un bot.
    if (!message.content.startsWith(CONFIG.prefix) || message.author.bot) return;
    
    // Ejecutamos el comando correspondiente si el mensaje contiene un comando.
    command.ejecutarComando(client, message);
});

// Evento que se dispara cuando el bot se ha conectado exitosamente.
client.on('ready', () => {
    console.log(`${client.user.tag} se ha conectado`);
});

// Iniciamos sesión en Discord usando el token proporcionado en la configuración.
client.login(CONFIG.token);