import React from "react";

const Message = ({ user, message, classs }) => {
  console.log(classs, "U");
  if (user) {
    return (
      <div className="flex">
        <p className={`m-1 px-2  py-2 rounded-lg text-white bg-green-500`}>
          {`${user}: ${message}`}
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex">
        <p className={`m-1 px-8 py-2 rounded-lg text-white bg-red-500 ml-auto`}>
          {`You: ${message}`}
        </p>
      </div>
    );
  }
};

export default Message;
