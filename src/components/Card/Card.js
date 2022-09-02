import React from "react";
import "./Card.scss";

export default function Card({
  children,
  value,
  className,
  onClick,
  cardIndex,
}) {
  const handeClick = () => {
    onClick(cardIndex, value);
  };

  return (
    <div className={className} onClick={handeClick}>
      <div className="front"></div>
      <div className="back">{children}</div>
    </div>
  );
}
