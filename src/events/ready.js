module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Serving ${client.guilds.cache.size} guild(s).`);

    client.user.setPresence({
      activities: [{ name: "Dashboard • /ping", type: 0 }],
      status: "online"
    });
  }
};
