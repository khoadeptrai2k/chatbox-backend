const ThirdPartyChatBoxCtrl = require("../third-party-chatbox");
const chat = require("./chat");
const LlamaClient = require("../../libs/llama");

class LlamaCtrl extends ThirdPartyChatBoxCtrl {
  constructor({ thirdParty, tracer }) {
    super({ thirdParty, tracer });

    this.chat = chat.bind(this);
    this.client = new LlamaClient()
  }
}

module.exports = LlamaCtrl;
