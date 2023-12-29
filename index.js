// Importamos la librería discord.js para interactuar con la API de Discord.
const Discord = require('discord.js');

// Importamos el CommandManager de 'bot-discord-tools', que es una libreria de gestion
const { CommandManager } = require('bot-discord-tools');

// Importamos la configuración desde un archivo externo (config.json).
const CONFIG = require('./config.json');

// Creamos una instancia del cliente de Discord, configurando ciertos intents.
const client = new Discord.Client({
    intents: ['Guilds', 'MessageContent', 'GuildMembers', 'GuildMessages']
});

// Creamos una instancia de CommandManager para gestionar comandos.
const command = new CommandManager();

// Definimos el prefijo por defecto para los comandos usando la configuración.
command.definirPrefijoPorDefecto(CONFIG.prefix);

// Agregamos un comando de ejemplo llamado "ping" que responde con "pong!".
command.agregarComando({
    nombre: "ping",
    ejecutar: (message, args) => {
        message.reply("pong!");
    }
});

// Evento que se dispara cuando el bot se ha conectado exitosamente.
client.on('ready', () => {
    console.log(`${client.user.tag} se ha conectado`);
});

// Evento que se dispara cuando se recibe un nuevo mensaje.
client.on('messageCreate', (message) => {
    // Verificamos si el mensaje comienza con el prefijo configurado.
    if (message.content.startsWith(CONFIG.prefix)) {
        // Ejecutamos el comando correspondiente si el mensaje contiene un comando.
        command.ejecutarComando(client, message);
    }
});

// Iniciamos sesión en Discord usando el token proporcionado en la configuración.
client.login(CONFIG.token);
