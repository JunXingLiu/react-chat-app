import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import Input from '../Input/Input';

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://react-realtimechat.herokuapp.com/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            if(error) {
              alert(error);
            }
          });

    }, [ENDPOINT, location.search])

    // receiving messages
    useEffect( () => {
        socket.on('message', (message) => {
            setMessages([ ...messages, message ]);
        });
    
        // shows people in room
        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });

        // when disconnecting
        return () => {
            socket.emit('disconnect');

            socket.off();
        }

    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        
        if(message.trim()) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat;