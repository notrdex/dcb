require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const required = ["DISCORD_TOKEN", "DISCORD_CLIENT_ID"];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing environment variable: ${key}`);
    process.exit(1);
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

function loadCommands() {
  const dir = path.join(__dirname, "commands");
  if (!fs.existsSync(dir)) return;

  for (const file of fs.readdirSync(dir).filter(f => f.endsWith(".js"))) {
    const command = require(path.join(dir, file));
    if (!command.data || !command.execute) continue;
    client.commands.set(command.data.name, command);
  }
}

function loadEvents() {
  const dir = path.join(__dirname, "events");
  if (!fs.existsSync(dir)) return;

  for (const file of fs.readdirSync(dir).filter(f => f.endsWith(".js"))) {
    const event = require(path.join(dir, file));
    if (!event.name || !event.execute) continue;

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
}

async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI not set — starting without MongoDB.");
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected.");
}

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

loadCommands();
loadEvents();

(async () => {
  try {
    await connectDatabase();
    await client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
})();
