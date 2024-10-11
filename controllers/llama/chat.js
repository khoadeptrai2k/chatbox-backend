module.exports = async function chat(params) {
  this.logger.info(`chat - params: ${JSON.stringify(params)}`);

  const { conversationId, text, type, media } = params;

  const newMessage = await this.doUpdate({
    conversationId,
    text,
    type,
    media,
  });

  if (!newMessage) {
    return null;
  }
  this.logger.info(`chat - conversationId: ${conversationId} - text: ${text}`);

  const responseFromAI = await this.client.getResponse(text);

  if (!responseFromAI) {
    return null;
  }

  const newMessageAI = await this.doUpdate({
    conversationId: newMessage.conversation,
    text: responseFromAI,
    type: "system",
    media: null,
  });

  return newMessageAI;
};
