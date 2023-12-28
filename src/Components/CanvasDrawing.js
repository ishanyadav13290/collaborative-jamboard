import { useEffect, useState } from 'react';
import "../App.css";
import Board from './Board';
import Joinees from './Joinees';
import Chats from './Chats';
import { useParams } from 'react-router-dom';

const CanvasDrawing = ({socket,name}) => {

  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState(5);
  let {id} = useParams("id")
  // useEffect(() => {

  //   // // Emit the room name to the server
  //   // console.log(id,name)
  //   // socket?.emit("join", {id,name});

  //   // Cleanup: Disconnect socket when component unmounts
  //   return () => {
  //     socket?.disconnect();
  //   };
  // }, [id, name, socket]);

  return (
    <div className="App" >
    <Joinees socket={socket} name={name} />
      <div>
      <h1>Collaborative Whiteboard</h1>
      <div>
        <Board roomId={id} brushColor={brushColor} brushSize={brushSize} socket={socket}/>
        <div className='tools' >
          <div>
            <span>Color: </span>
            <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
          </div>
          <div>
            <span>Size: </span>
            <input type="range" color='#fac176'
              min="1" max="100" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} />
            <span>{brushSize}</span>
          </div>
        </div>
      </div>
      </div>
      <Chats socket={socket} name={name} id={id} />
    </div>
  );
};

export default CanvasDrawing;