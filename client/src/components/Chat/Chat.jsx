import React, { useEffect, useState } from "react";
import closeIcon from "/close.png";
import send from "/send.png";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../Message/Message";
import socketIO from "socket.io-client";
import ReactScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT = "http://localhost:4500";
let socket;
const Chat = () => {
  const [id, setid] = useState("");
  const { user } = useParams();
  const navigate = useNavigate();
  const [messages, setmessages] = useState([]);
  const [msg, setmsg] = useState("");

  const handleOnClick = () => {
    socket.emit("message", { msg, id });
    // setmessages([...messages, { user, message: msg }]);
    setmsg("");
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert("connected");
      setid(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", ({ user, message }) => {
      setmessages([...messages, { user, message }]);

      console.log(user, message);
    });

    socket.on("userJoined", ({ user, message }) => {
      setmessages([...messages, { user, message }]);
    });

    socket.on("leave", ({ user, message }) => {
      setmessages([...messages, { user, message }]);
    });

    return () => {
      socket.emit("disconnected");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", ({ user, msg, id }) => {
      setmessages([...messages, { user, message: msg, id }]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="sm:w-1/2 w-[98%]  m-auto">
        <div className="bg-indigo-500 flex justify-between p-2">
          <p className="pl-2 text-white">Groupy Chat</p>
          <img
            width={30}
            src={closeIcon}
            alt="closeIcon"
            className="pr-2 cursor-pointer"
            onClick={() => {
              socket.emit("disconnected");
              socket.off();
              navigate("/");
            }}
          />
        </div>

        <ReactScrollToBottom className="h-52 pt-2 min-h-full bg-white">
          {messages &&
            messages.map((message, ind) => (
              <Message
                key={ind}
                user={message.id === id ? "" : message.user}
                message={message.message}
                classs={message.id === id ? "right" : "left"}
              />
            ))}
        </ReactScrollToBottom>
        <div className="bg-indigo-500 flex justify-between">
          <input
            className="w-[80%] outline-none pl-2 font-bold border-t-2 border-blue-500 placeholder-indigo-400"
            placeholder="Type Your message here ....."
            type="text"
            value={msg}
            onChange={(event) => setmsg(event.target.value)}
            onKeyDown={(event) =>
              event.key === "Enter" ? handleOnClick() : null
            }
          />
          <img
            className="mx-auto p-2 cursor-pointer transform hover:scale-125 transition-transform duration-300 ease-in-out"
            width={60}
            src={send}
            alt="sendIcon"
            onClick={handleOnClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
