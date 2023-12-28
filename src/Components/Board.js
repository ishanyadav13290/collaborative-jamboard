import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const Board = ({ brushColor, brushSize, socket, roomId }) => {
  const canvasRef = useRef(null);
  let contextRef=useRef({});

  useEffect(() => {
    if (socket) {
      // Event listener for receiving canvas data from the socket
      socket.on("canvasImage", (dataURL) => {
        console.log("data incoming")
        const image = new Image();
        image.src = dataURL;
  
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
  
        // Draw the image onto the canvas
        image.onload = () => {
          ctx.drawImage(image, 0, 0);
        };
      });
    }
  }, [socket]);

  useEffect(() => {
    // if (socket) {
      // Event listener for receiving canvas data from the socket
      function latestDrawing(data){
        // socket.on("receiveMessage", (data) => {
          console.log(data)
          // Create an image object from the data URL
          const image = new Image();
          image.src = data.dataURL;
  
          const canvas = canvasRef.current;
          // eslint-disable-next-line react-hooks/exhaustive-deps
          const ctx = canvas.getContext("2d");
          // Draw the image onto the canvas
          image.onload = () => {
            ctx.drawImage(image, 0, 0);
          };
        // });
      }
      function erase(){
        console.log("erase is happened")
        contextRef?.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }

      socket.on("newCanvas",latestDrawing)
      socket.on("erase",erase)

    // }
  }, [socket]);

  useEffect(() => {
    // Variables to store drawing state
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e) => {
      isDrawing = true;

      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    // Function to draw
    const draw = (e) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }

      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    // Function to end drawing
    const endDrawing = () => {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL(); // Get the data URL of the canvas content

      // Send the dataURL or image data to the socket
      // console.log('drawing ended')
      if (socket) {
        socket.emit("canvasImage", {dataURL,room:roomId});
      }
      isDrawing = false;
    };

    const canvas = canvasRef.current;
    const ctx = canvasRef.current?.getContext("2d");
    contextRef.current = ctx;

    // Set initial drawing styles
    if (ctx) {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
    // Event listeners for drawing
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mouseout", endDrawing);

    return () => {
      // Clean up event listeners when component unmounts
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", endDrawing);
      canvas.removeEventListener("mouseout", endDrawing);
    };
  }, [brushColor, brushSize, socket]);

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function clear() {
    const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL();
    contextRef?.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    socket.emit("eraseImage",{room:roomId,dataURL})
  }

  let buttonStyle = {
    parent:{ 
    // width: "100%", 
    textAlign: "center",
   },
   button:{ width: "100%", 
   padding: "10px",
  }
  }


  return (
    <>
      <canvas
        ref={canvasRef}
        width={windowSize[0] > 600 ? 600 : 300}
        height={windowSize[1] > 400 ? 400 : 200}
        style={{ backgroundColor: "white" }}
      />
      <br />
      <div style={buttonStyle.parent}>
        <button style={buttonStyle.button} onClick={clear}>Clear</button>
      </div>
    </>
  );
};

export default Board;
