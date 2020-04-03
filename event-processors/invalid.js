module.exports = (event) => {
    const messages = [
        {
            type: 'text',
            text: 'Invalid action',
        },
    ];
  
    return Promise.resolve(messages);
};