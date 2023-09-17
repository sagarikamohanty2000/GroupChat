const cron = require("cron");
const Message = require("../model/message");
const ChatArchive = require("../model/chat_archive");

exports.archiveCron = new cron.CronJob(
  "0 12 * * *",
  async () => {
    try {
      console.log("running");
      const chatsToArchive = await Message.findAll();

      await ChatArchive.bulkCreate(chatsToArchive.map((chat) => chat.toJSON()));

      // Delete archived chats from the Chat table
      await Chat.destroy({ where: {} });

      console.log("Chats archived successfully.");
    } catch (error) {
      console.error("Error archiving chats:", error);
    }
  },
  "Asia/Kolkata"
);
