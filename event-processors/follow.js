module.exports = (event) => {
    const messages = [
        {
            type: 'text',
            text: 'Thank you for following this channel',
        },
    ];
  
    return Promise.resolve(messages);
};