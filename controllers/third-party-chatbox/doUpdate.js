const ConversationSchema = require("../../models/schema/ConversationSchema");
const MessageSchema = require("../../models/schema/MessageSchema");

module.exports = async function doUpdate(params) {
  const { conversationId, text, type, media } = params;

  this.logger.info(`doUpdate - conversation: ${conversationId} - text: ${text} - type: ${type}`);

  let newConversation = null;
  if (!conversationId) {
    newConversation = await new ConversationSchema({
      type: type,
      text,
      media,
      thirdParty: this.thirdParty,
    }).save();
  } else {
    newConversation = await ConversationSchema.findOneAndUpdate(
      {
        _id: conversationId,
      },
      {
        type: type,
        text,
        media,
        thirdParty: this.thirdParty,
      },
      { new: true, upsert: true }
    );
  }

  this.logger.info(`newConversation - conversation: ${newConversation._id}`);

  const newMessage = new MessageSchema({
    conversation: newConversation._id,
    type: type,
    text,
    media,
    thirdParty: this.thirdParty,
  });

  this.logger.info(`newMessage - message: ${newMessage._id}`);

  await newMessage.save();

  return newMessage;
};
