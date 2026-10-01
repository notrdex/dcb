require("dotenv").config();

const { REST, Routes } = require("discord.js");
const ping = require("./commands/ping");

const commands = [ping.data.toJSON()];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registering application commands...");

    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      { body: commands }
    );

    console.log("Commands registered.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
