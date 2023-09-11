import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import chatIcon from "/chat.png";

const Join = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const handleLoginPage = (event) => {
    username.length < 3
      ? event.preventDefault()
      : navigate(`/chat/${username}`);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <main className="border border-y-4 border-indigo-500  sm:w-1/2  w-[98%] p-12 bg-white flex flex-col items-center justify-center">
        <img src={chatIcon} alt="chatIcon" width={150} />
        <input
          placeholder="Enter Your Username"
          type="text"
          onChange={(event) => setUserName(event.target.value)}
          value={username}
          className="border border-gray-900 opacity-50 outline-none w-full mt-8 rounded-sm p-2 text-xl font-bold placeholder-black text-center"
        />

        <button
          type="submit"
          className="bg-indigo-500 rounded-lg p-4 mt-4 w-full text-white font-bold"
          onClick={handleLoginPage}
        >
          Log in
        </button>
      </main>
    </div>
  );
};

export default Join;
