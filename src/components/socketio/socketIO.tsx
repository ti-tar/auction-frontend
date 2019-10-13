import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./socketIOStyles.scss";

interface Props {

}

interface WSDataResponse {
  message: string;
}

let socket: SocketIOClient.Socket;
let setTimeoutId: NodeJS.Timeout;

const SocketIO: React.FC<Props> = () => {
  const [respMsg, setRespMsg] = useState('');
  const { REACT_APP_API_SOCKETIO_URL } = process.env;

  const showRespResult = (data: WSDataResponse) => {
    console.log(data.message);
    setRespMsg(data.message);
    clearTimeout(setTimeoutId);
    setTimeoutId = setTimeout(() => setRespMsg(''), 10000);
  };

  useEffect(() => {
    socket = io(String(REACT_APP_API_SOCKETIO_URL) + '/lots');
    
    socket.on("connection", () => {
      console.log("socket.io connected");
    });

    socket.on("error", () => {
      console.log("Error sended from server");
    });

    socket.on("checkBrowserConnection", showRespResult);
    socket.on("bidsUpdated", showRespResult);
  }, [REACT_APP_API_SOCKETIO_URL]);

  const sendIOquery = () => {
    socket.emit("checkServerConnection");
  };

  return (
    <div className="socketIoWrapper">
      socket io:
      {!!respMsg && <span className="success">{respMsg}</span>}
      <button type="button" onClick={sendIOquery}>
        ping
      </button>
    </div>
  );
};

export default SocketIO;
