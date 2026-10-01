module.exports = {
  name: "guildDelete",

  async execute(guild) {
    console.log(`Left guild: ${guild.name} (${guild.id})`);
  }
};
