import { Client, Message, Partials } from "discord.js";
import "dotenv/config";
import triggers from "./triggers.json";
import { randomVerseEmbed } from "./verse";

// Create client
console.log("Starting...");
const client = new Client({
  intents: ["DirectMessages", "GuildMessages", "Guilds", "MessageContent"],
  partials: [Partials.Channel],
});

// Once ready
client.on("ready", async () => {
  if (!client.user || !client.application) {
    return;
  }

  // Set status
  client.user.setActivity(`5x Prayer Daily`);

  console.log(`${client.user.username} is online.`);
});

// On new message
client.on("messageCreate", msg => {
  if (msg.author.bot) {
    return;
  }

  // Reply if mentioned
  if (msg.mentions.has(client.user!)) {
    activate(msg, "@QuranBot");
    return;
  }

  // Reply if contains trigger word
  for (var i = 0; i < triggers.length; i++) {
    if (msg.content.toLowerCase().includes(triggers[i])) {
      activate(msg, triggers[i]);
      return;
    }
  }
});

// Login
client.login(process.env.BOT_TOKEN);

// Activate reply to message
function activate(msg: Message, trigger?: string): void {
  msg.reply({ embeds: [randomVerseEmbed(trigger)] });
  console.log("+1 Supporter of Allah!");
}
