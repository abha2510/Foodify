// import React from 'react'
// import UserInput from './UserInput'
// import MessageList from './MessageInput'

// const Chatbot = () => {
//     const messages = [
//         { id: 1, text: 'Hello', type: 'received' },
//         { id: 2, text: 'Hi', type: 'sent' },
// ]
// const onSendMessage = (message) => {
//     // Handle sending the message
//     console.log('Message sent:', message);
//   };
//     return (
//       <div>
//         <UserInput onSendMessage={onSendMessage}  />
//         <MessageList messages={messages} />
      
//       </div>
//     );
  
// }

//export default Chatbot
//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



import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async () => {
    if (inputValue.trim() === '') return;

    // Add user message to the chat history
    setMessages(prevMessages => [
      ...prevMessages,
      { id: Date.now(), text: inputValue, type: 'user' },
    ]);

    // Generate chatbot response using OpenAI API
    try {
      const response = await generateChatbotResponse(inputValue);
      // Add chatbot response to the chat history
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now(), text: response, type: 'chatbot' },
      ]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message to the chat history
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now(), text: 'An error occurred. Please try again.', type: 'chatbot' },
      ]);
    }

    // Clear the input field
    setInputValue('');
  };

  const generateChatbotResponse = async (message) => {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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', // Replace with your actual API key
      },
      body: JSON.stringify({
        prompt: `User: ${message}\nChatbot:`,
        max_tokens: 50,
        temperature: 0.7,
        model: "gpt-3.5-turbo",
        messages: [{role: "system", content: "You are a helpful assistant."}, {role: "user", content: "Hello!"}],
        n: 1,
        stop: null,
      }),
    });

    const data = await response.json();
    const chatbotResponse = data.choices[0]?.text.trim() || 'Unable to generate a response.';
    return chatbotResponse;
  };

  return (
    <div className="chatbot-container">
      <div className="message-list">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="user-input">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
