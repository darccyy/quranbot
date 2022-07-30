import { Client, Partials } from "discord.js";
import "dotenv/config";
import triggers from "./triggers.json";
import { randomVerseEmbed } from "./verse";

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

  // Reply
  const content = msg.content.toLowerCase();
  for (var i = 0; i < triggers.length; i++) {
    if (content.includes(triggers[i])) {
      msg.reply({ embeds: [randomVerseEmbed(triggers[i])] });
      console.log("+1 Supporter of Allah !");
    }
  }
});

// Login
client.login(process.env.BOT_TOKEN);
