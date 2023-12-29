import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css'; // Import your CSS file

const Main = ({ socket, setName, name }) => {
  const [id, setId] = useState("");
  const navigate = useNavigate(null);

  const joinRoom = (e) => {
    e.preventDefault()
    navigate(`/room/${id}`);
    socket.emit("join", { room: id, name });
  };

  return (
    <div className='mainContainer mouseTrail'>
      <form className='fields' onSubmit={joinRoom}>
        <input
          type="text"
          className='inputField'
          onChange={(e) => setId(e.target.value)}
          placeholder='Enter Room ID'
          required
        />
        <br />
        <input
          type="text"
          className='inputField'
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter Name'
          required
        />
        <br />
        <button
          className='joinButton'
          type='submit'
        >
          Join Room
        </button>
      </form>
    </div>
  );
}

export default Main;
