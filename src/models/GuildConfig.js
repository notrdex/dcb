const mongoose = require("mongoose");

const guildConfigSchema = new mongoose.Schema(
  {
    guildId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    welcome: {
      enabled: { type: Boolean, default: false },
      channelId: { type: String, default: null },
      message: { type: String, default: "Welcome {user}!" }
    },

    goodbye: {
      enabled: { type: Boolean, default: false },
      channelId: { type: String, default: null },
      message: { type: String, default: "Goodbye {user}!" }
    },

    moderation: {
      enabled: { type: Boolean, default: true },
      logChannelId: { type: String, default: null }
    },

    tickets: {
      enabled: { type: Boolean, default: false },
      categoryId: { type: String, default: null }
    },

    embeds: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("GuildConfig", guildConfigSchema);
