import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./GameBoard.scss";
import { gridStyle } from "./gridStyle";

let finishGame = 0;

export default function GameBoard({
  selectedPic,
  gameState,
  handleGameState,
  errorMessage,
}) {
  const [selectCardIndex, setselectCardIndex] = useState([]);
  const [selectCarValue, setSelectCarValue] = useState([]);

  //reset the game if the breed or sub-bred changes
  useEffect(() => {
    setSelectCarValue([]);
    setselectCardIndex([]);
    finishGame = 0;
  }, [selectedPic]);

  useEffect(() => {
    if (selectCardIndex.length === 2) {
      if (selectCarValue[0] === selectCarValue[1]) {
        gameState[selectCardIndex[0]] = 1;
        gameState[selectCardIndex[1]] = 1;
        handleGameState(gameState);
        setSelectCarValue([]);
        setselectCardIndex([]);
        finishGame++;
      }
      const timer = setTimeout(() => {
        setSelectCarValue([]);
        setselectCardIndex([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectCarValue, selectCardIndex, gameState, handleGameState]);

  const handleClick = (index, value) => {
    if (
      selectCardIndex.length === 2 ||
      selectCardIndex.includes(index) ||
      finishGame === 10
    ) {
      return null;
    }
    setselectCardIndex((prev) => [...prev, index]);
    setSelectCarValue((prev) => [...prev, value]);
  };

  return (
    <div
      className="GameBoard"
      style={selectedPic.length ? gridStyle(selectedPic.length) : null}
    >
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : selectedPic.length ? (
        selectedPic.map((element, index) => {
          return (
            <Card
              key={index}
              value={element}
              className={
                selectCardIndex && selectCardIndex.includes(index)
                  ? "Card animate"
                  : gameState[index] === 1
                  ? "Card animate"
                  : "Card"
              }
              onClick={handleClick}
              cardIndex={index}
            >
              <img src={element} width="100%" height="auto" alt="dog"></img>
            </Card>
          );
        })
      ) : (
        <>
          <p>En attente de votre choix.</p>
        </>
      )}
    </div>
  );
}
