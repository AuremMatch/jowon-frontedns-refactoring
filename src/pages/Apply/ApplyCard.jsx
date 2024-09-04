import React from "react";

export default function ApplyCard({ user }) {
  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200">
      <img
        src={user.avatar}
        alt={`${user.username}'s avatar`}
        className="w-24 h-24 rounded-full mb-4 border-4 border-gray-300 shadow-lg"
      />
      <p className="text-xl font-semibold text-white text-center">
        {maskUsername(user.username)}
      </p>
    </div>
  );
}

// 사용자가 가운데 글자를 'o'로 가리는 함수 그대로 사용합니다.
const maskUsername = (username) => {
  const length = username.length;

  if (length < 3) return username;

  const middleIndex = Math.floor(length / 2);
  return username
    .split("")
    .map((char, index) =>
      index === middleIndex || (length % 2 === 0 && index === middleIndex - 1)
        ? "o"
        : char
    )
    .join("");
};
