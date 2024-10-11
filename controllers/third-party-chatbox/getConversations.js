const ConversationSchema = require("../../models/schema/ConversationSchema");

module.exports = async function getConversations(params) {
  const { page = 0, limit = 10 } = params;

  const query = {};

  this.logger.info(`getConversations - query: ${JSON.stringify(query)}`);

  const [conversations, count] = await Promise.all([
    ConversationSchema.find(query)
      .sort({ updatedAt: -1 })
      .skip(page * limit)
      .limit(limit),
    ConversationSchema.countDocuments(query),
  ]);
  console.log(conversations);
  return { list: conversations, count };
};
