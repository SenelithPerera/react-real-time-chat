import React from 'react'

import './Input.css';

export const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="type a message"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
      />
      <button className="sendButton" onClick={(evt => sendMessage(evt))}>Send</button>
    </form>
  )
}
