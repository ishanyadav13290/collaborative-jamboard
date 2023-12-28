import { Route, Routes } from "react-router-dom";
import CanvasDrawing from "./Components/CanvasDrawing";
import Main from "./Components/Main/Main";
import { io } from "socket.io-client";
import { useMemo, useState } from "react";

function App() {
  const [name, setName] = useState("User");
    const socket = useMemo(() => io("http://localhost:3001"), []);
  return (
    <>
    <div>
    <Routes>  
      <Route path="/" element={<Main socket={socket} name={name}
setName={setName} />} />
      <Route path="/room/:id" element={<CanvasDrawing socket={socket} name={name} />} />
    </Routes>
    </div>
    </>
  );
}



export default App;
