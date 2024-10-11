module.exports = async function chat(params) {
  this.logger.info(`chat - params: ${JSON.stringify(params)}`);

  const { conversationId, text, type, media } = params;

  if (type === "user") {
    const newMessage = await this.doUpdate({
      conversationId,
      text,
      type,
      media,
    });

    if (!newMessage) {
      return null;
    }
  }
  this.logger.info(`chat - conversationId: ${conversationId} - text: ${text}`);

  const chatGptClient = await this.getChatGptClient();

  const responseChatGpt = await chatGptClient.getResponse(text);

  if (!responseChatGpt) {
    return null;
  }

  const newMessageAI = await this.doUpdate({
    conversationId,
    text: responseChatGpt,
    type: "system",
    media: null,
  });

  return newMessageAI;
};
