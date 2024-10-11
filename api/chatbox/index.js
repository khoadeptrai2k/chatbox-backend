const router = require("express").Router();
const logger = require("../../config/logger");
const ChatGptCtrl = require("../../controllers/chatGpt");
const LlamaCtrl = require("../../controllers/llama");
const ThirdPartyChatBoxCtrl = require("../../controllers/third-party-chatbox");
const ServerErrMessage = require("../../utils/serverErrMessage");

router.post("/get_conversations", async (req, res, next) => {
  try {
    const { thirdParty } = req.body;
    const ctrl = getController(thirdParty);
    const result = await ctrl.getConversations(req.body);
    return res.send(result);
  } catch (error) {
    ServerErrMessage("getConversations", res);
    logger.error(`controller, thirdPartyChatBoxCtrl.js, getConversations, ${error}`);
  }
});

router.post("/get_messages", async (req, res, next) => {
  try {
    const { thirdParty } = req.body;
    const ctrl = getController(thirdParty);
    const result = await ctrl.getMessages(req.body);
    return res.send(result);
  } catch (error) {
    ServerErrMessage("getMessages", res);
    logger.error(`controller, thirdPartyChatBoxCtrl.js, getMessages, ${error}`);
  }
});

router.post("/chat", async (req, res, next) => {
  try {
    const { thirdParty } = req.body;
    const ctrl = getController(thirdParty);
    const result = await ctrl.chat(req.body);
    return res.send(result);
  } catch (error) {
    console.log(error);
    ServerErrMessage("chat", res);
    logger.error(`controller, thirdPartyChatBoxCtrl.js, chat, ${error}`);
  }
});

const getController = (thirdParty) => {
  let ctrl = null;
  switch (thirdParty) {
    case "llama":
      ctrl = LlamaCtrl;
      break;
    case "chatGpt":
      ctrl = ChatGptCtrl;
      break;
    default:
      ctrl = ThirdPartyChatBoxCtrl;
      break;
  }

  return new ctrl({
    thirdParty,
  });
};

module.exports = router;
