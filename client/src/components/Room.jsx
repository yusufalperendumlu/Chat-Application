import React, { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Room = ({
  username,
  room,
  setUsername,
  setRoom,
  setChatScreen,
  socket,
}) => {
  const [value, setValue] = useState("");

  const sendRoom = () => {
    socket.emit("room", room);
    setChatScreen(true);
  };

  const disableHandler = () => {
    if (username.trim() === "" || room.trim() === "" || !value) {
      return true;
    }

    return false;
  };

  const checkHandler = (e) => {
    if (username.length > 0 && room.length > 0) {
      toastr.success("Giris gerceklestiriliyor");
      setValue(e.target.checked);
    }
  };

  return (
    <div className="flex z-0 bg-room bg-no-repeat bg-cover h-screen items-center justify-center overflow-hidden">
      <div className="w-2/5 h-3/5 bg-gradient-to-tl from-transparent via-red-300 flex items-center justify-center rounded-lg shadow-2xl  shadow-black relative">
        <div className="flex flex-col items-center justify-between gap-y-2">
          <h1 className="text-4xl font-bold text-gray-800 mb-14">
            Welcome to Chat
          </h1>
          <input
            className="peer bg-transparent outline-none border-b-2 border-gray-500 delay-200 text-gray-600 placeholder:text-gray-400 text-md rounded-lg w-4/5 p-2.5  transition-all ease-out duration-300 focus:shadow-custom focus:border-cyan-800 focus:bg-slate-100 mb-7"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <input
            className="peer bg-transparent outline-none border-b-2 border-gray-500 delay-200 text-gray-600 placeholder:text-gray-400 text-md rounded-lg w-4/5 p-2.5 indent-1 transition-all ease-out duration-300 focus:shadow-custom focus:border-cyan-800 focus:bg-slate-100"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            type="text"
            placeholder="Room number"
          />
          <div className="flex items-center w-3/4 mb-7">
            <input
              id="default-checkbox"
              type="checkbox"
              value={value}
              onChange={checkHandler}
              onClick={checkHandler}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-checkbox"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Confirmation checkbox
            </label>
          </div>
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
