import React from "react";

export const StarRating = ({ totalStars = 5, yellowStars = 0 }) => {
  totalStars = Number.isInteger(totalStars) && totalStars > 0 ? totalStars : 5;
  yellowStars =
    Number.isInteger(yellowStars) && yellowStars >= 0 ? yellowStars : 0;

  const greyStars = totalStars - yellowStars;

  return (
    <div className="flex">
      {[...Array(yellowStars)].map((_, index) => (
        <span key={index} className="text-yellow-500">
          ★
        </span>
      ))}
      {[...Array(greyStars)].map((_, index) => (
        <span key={index} className="text-gray-400">
          ★
        </span>
      ))}
    </div>
  );
};
