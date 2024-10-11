const ThirdPartyChatBoxCtrl = require("../third-party-chatbox");
const ChatGptLib = require("../../libs/chatGpt");
const chat = require("./chat");

class ChatGptCtrl extends ThirdPartyChatBoxCtrl {
  constructor({ thirdParty, tracer }) {
    super({ thirdParty, tracer });

    this.chat = chat.bind(this);
    this.ChatGptClient = null;
  }

  async getChatGptClient() {
    if (!this.ChatGptClient) {
      this.ChatGptClient = new ChatGptLib();
    //   this.ChatGptClient.getConfig();
    }

    return this.ChatGptClient;
  }
}

module.exports = ChatGptCtrl;
