import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("messageReturn", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date: new Date(Date.now).getHours() - new Date(Date.now).getMinutes(),
    };

    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent]);
    setMessage("");
  };

  return (
    <div className="flex h-screen ">
      <div className="relative w-full">
        <div className="w-full h-16 bg-gray-700 flex items-center p-3">
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </div>

        {messageList &&
          messageList.map((message, index) => (
            <div
              className={`${
                username === message.username ? "flex justify-end" : ""
              }  `}
            >
              <div
                className={`${
                  username === message.username ? "bg-green-600" : "bg-blue-600"
                } w-1/3 h-12 p-1   m-2 rounded-xl rounded-br-none`}
              >
                <p className="text-white">{message.message}</p>
                <span className="w-full flex justify-end text-sm text-gray-300 ">
                  {message.username} - {message.date}
                </span>
              </div>
            </div>
          ))}

        <div className="absolute bottom-0  w-full">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-4/5 h-12 border p-3 outline-none"
            type="text"
            placeholder="message send"
          />
          <button
            onClick={sendMessage}
            className="w-1/5 bg-indigo-600 text-white h-12 hover:opacity-80 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
