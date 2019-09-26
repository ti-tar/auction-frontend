import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './socketIOStyles.scss';

let socket: any;

const SocketIO: React.FC<any> = (props) => {
  
  const [respMsg, setRespMsg] = useState(false);

  const showRespResult = (data: any) => {
    console.log(data.message);
    setRespMsg(data.message);
    setTimeout(() => setRespMsg(false), 10000);
  }

  useEffect(() => {
    socket = io('http://localhost:5000/');
    
    socket.on("connection", () => {
      console.log("socket.io connected");
    });

    socket.on("checkBrowserConnection", showRespResult);
    socket.on("bidsUpdated", showRespResult);

  }, []);

  const sendIOquery = () => {
    socket.emit('checkServerConnection')
  }

  return <div className="socketIoWrapper">
    check socket io {!!respMsg && <span className='success'>{respMsg}</span>} 
    <button type="button" onClick={sendIOquery}>send</button>
  </div>;
}

export default SocketIO;