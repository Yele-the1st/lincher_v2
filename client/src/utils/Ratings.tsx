import React, { FC } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

interface RatingsProps {
  rating: number;
}

const Ratings: FC<RatingsProps> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar
          key={i}
          color="#f6b100"
          size={18}
          className={`mr-1 cursor-pointer`}
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          key={i}
          color="#f6b100"
          size={16}
          className={`mr-1 cursor-pointer`}
        />
      );
    } else {
      stars.push(
        <AiOutlineStar
          key={i}
          color="#f6b100"
          size={18}
          className={`mr-1 cursor-pointer`}
        />
      );
    }
  }

  return <div className="flex">{stars}</div>;
};

export default Ratings;
