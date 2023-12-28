import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css'; // Import your CSS file

const Main = ({socket,setName,name}) => {
  const [id, setId] = useState("");
  const navigate = useNavigate(null);

  const joinRoom =() => {
    navigate(`/room/${id}`);
    socket.emit("join",{room:id,name})
  }

  return (
    <div className='mainContainer'>
      <input
        type="text"
        className='inputField'
        onChange={(e) => setId(e.target.value)}
        placeholder='Enter Room ID'
      />
      <input
        type="text"
        className='inputField'
        onChange={(e) => setName(e.target.value)}
        placeholder='Enter Name'
      />
      <button
        className='joinButton'
        onClick={joinRoom}
      >
        Join Room
      </button>
    </div>
  );
}

export default Main;
