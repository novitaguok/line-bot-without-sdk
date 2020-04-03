module.exports = (event) => {
    const messages = [
        {
            type: 'text',
            text: 'Hi, I am Chatbot, nice to meet you all!',
        },
    ];
  
    return Promise.resolve(messages);
};