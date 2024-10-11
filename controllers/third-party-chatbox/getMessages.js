const MessageSchema = require("../../models/schema/MessageSchema");

module.exports = async function getMessages(params) {
  const { page, limit, conversationId } = params;

  const query = {
    thirdParty: this.thirdParty,
    conversation: conversationId,
  };

  this.logger.info(`getMessages - query: ${JSON.stringify(query)}`);

  const [conversations, count] = await Promise.all([
    MessageSchema.find(query)
      .sort({ updatedAt: 1 })
      .skip(page * limit)
      .limit(limit),
    MessageSchema.countDocuments(query),
  ]);
  return { list: conversations, count };
};
