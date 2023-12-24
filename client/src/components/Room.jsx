import React, { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Room = ({ room, setRoom, setChatScreen, socket }) => {
  const [username, setUsername] = useState("");

  const sendRoom = (e) => {
    e.preventDefault();

    if (username.trim().length !== 0) {
      console.log("try");
      toastr.error("Please enter username and room number");
    } else {
      console.log("try");
      toastr.error("Please enter username");
    }

    socket.emit("room", room);
    setChatScreen(true);
  };

  const disableHandler = () => {
    if (username.trim() === "" || room.trim() === "") {
      return true;
    }

    return false;
  };

  return (
    <div className="flex z-0 bg-room bg-no-repeat bg-cover h-screen items-center justify-center overflow-hidden">
      <div className="w-2/5 h-3/5 bg-gradient-to-tl from-transparent via-red-400 flex items-center justify-center rounded-lg shadow-2xl  shadow-black relative">
        <div className="flex flex-col items-center justify-between gap-y-14">
          <h1 className="text-4xl font-bold text-gray-800 ">Welcome to Chat</h1>
          <input
            className="peer bg-transparent outline-none border-b-2 border-gray-500 delay-200 text-white placeholder:text-gray-400 text-md rounded-lg w-4/5 p-2.5  transition-all ease-out duration-300 focus:shadow-custom focus:border-cyan-800"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <input
            className="peer bg-transparent outline-none border-b-2 border-gray-500 delay-200 text-white placeholder:text-gray-400 text-md rounded-lg w-4/5 p-2.5 indent-1 transition-all ease-out duration-300 focus:shadow-custom focus:border-cyan-800"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            type="text"
            placeholder="Room number"
          />
          <button
            className="bg-transparent cursor-pointer h-auto transition-all ease-in text-base hover:scale-105 duration-150 text-gray-800  font-semibold hover:text-slate-300 py-2 px-4 border-b-2 border-gray-800 hover:border-spacing-y-8 hover:border-white rounded"
            onClick={sendRoom}
            disabled={disableHandler()}
          >
            Start chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
