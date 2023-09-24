'use client';

import React, { useState, useEffect } from 'react';
import * as Ably from 'ably';

const ably = new Ably.Realtime({
  authUrl: `${process.env.NEXT_PUBLIC_URL}/api/ably/auth`,
});

function Chat({ userId }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const channel = ably.channels.get(`chat-${userId}`);
    channel.publish('message', inputValue);
    setInputValue('');
  };

  useEffect(() => {
    const channel = ably.channels.get(`chat-${userId}`);
    channel.attach(() => {
      channel.history((err, messagesPage) => {
        if (err) {
          console.error(err);
          return;
        }
        const messages = messagesPage.items.map((message) => message.data);
        setMessages(messages);
      });
    });
    channel.subscribe('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    });
    return () => {
      channel.unsubscribe();
    };
  }, [userId]);

  return (
    <div>
      <h2>Chat</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
