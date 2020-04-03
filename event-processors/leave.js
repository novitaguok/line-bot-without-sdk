module.exports = (event) => {
    const messages = [
        {
            type: 'text',
            text: 'Oh no, Chatbot has left',
        },
    ];
  
    return Promise.resolve(messages);
};