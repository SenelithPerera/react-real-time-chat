import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css'
import { ChatHeader } from '../ChatHeader/ChatHeader';
import { Input } from '../../Input/Input';
import { Messages } from '../Messages/Messages';
import { RoomInfo } from '../RoomInfo/RoomInfo';

let socket;

export const Chat = (props) => {
  const { location } = props;
  const [name, setName] = useState('');
  const [room, setRoom] = useState('')
  const [allUsersInRoom, setAllUsersInRoom] = useState([]);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    // use helpers
    socket = io(ENDPOINT)
    setName(name);
    setRoom(room)
    // emit emit when user sign in
    socket.emit('join', { name, room }, (error) => {
      if (error) alert(error);
    });
    // component unmount
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message]);
    })

    socket.on('roomData', ({ users }) => {
      setAllUsersInRoom(users);
    })
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <ChatHeader room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <RoomInfo users={allUsersInRoom}/>
    </div>
  )
}
