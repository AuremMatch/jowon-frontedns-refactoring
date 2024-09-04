import React from "react";

export default function ApplyCard({ user }) {
  // username에서 가운데 글자를 'o'로 가리는 함수
  const maskUsername = (username) => {
    const length = username.length;

    if (length < 2) return username; // 길이가 3 미만이면 가리지 않음

    const middleIndex = Math.floor(length / 2); // 가운데 인덱스 계산

    // username을 배열로 나눠서 가운데 글자/글자들을 'o'로 바꾸고 다시 문자열로 합침
    return username
      .split("")
      .map((char, index) =>
        index === middleIndex || (length % 2 === 0 && index === middleIndex - 1)
          ? "o"
          : char
      )
      .join("");
  };
  return (
    <div className="flex items-center">
      <img
        src={user.avatar}
        alt={`${user.이름}'s avatar`}
        className="w-16 h-16 rounded-full mr-4 border-2 border-gray-300"
      />
      <div className="flex justify-center flex-col ml-20">
        <p className="text-lg">{maskUsername(user.username)}</p>
      </div>
    </div>
  );
}
