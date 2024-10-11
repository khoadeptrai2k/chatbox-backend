const logger = require("../../config/logger");
const doUpdate = require("./doUpdate");
const getConversations = require("./getConversations.js");
const getMessages = require("./getMessages.js");

class ThirdPartyChatBoxCtrl {
  constructor({ thirdParty, tracer }) {
    this.thirdParty = thirdParty;
    this.tracer = tracer;
    this.logger = logger;
    this.doUpdate = doUpdate.bind(this);
    this.getConversations = getConversations.bind(this);
    this.getMessages = getMessages.bind(this);
  }
}

module.exports = ThirdPartyChatBoxCtrl;
