import { useEffect, useState } from "react";
import GameBoard from "../GameBoard/GameBoard";
import Selection from "../Selection/Selection";
import { retrievePict } from "../../Api/Api";
import { shuffleArray } from "../../Utils/Utils";
import "./App.scss";

function App() {
  const [selectedPic, setSelectedPic] = useState([]);
  const [breedChoice, setBreedChoice] = useState();
  const [subBreedChoice, setSubBreedChoice] = useState("");
  const [completeChoice, setCompleteChoice] = useState();
  const [gameState, setGameState] = useState(new Array(20).fill(null));
  const [error, setError] = useState("");

  //if sub-breed exists and is chosen, choice is complete
  useEffect(() => {
    if (subBreedChoice) {
      setCompleteChoice("complet");
    }
  }, [subBreedChoice]);

  //if choice is complete, fetch to retrieve pictures
  useEffect(() => {
    if (completeChoice === "incomplet") {
      setSelectedPic([]);
    }
    if (completeChoice === "complet") {
      setGameState(new Array(20).fill(null));
      const getPicture = async () => {
        const pictures = await retrievePict(breedChoice, subBreedChoice);
        if (Array.isArray(pictures)) {
          pictures.push(...pictures);
          shuffleArray(pictures);
          setSelectedPic(pictures);
        } else {
          handleError(pictures);
        }
      };
      getPicture();
      setCompleteChoice(null);
    }
  }, [completeChoice]);

  //manage choice for breed and sub-breed
  const handleChoices = (e) => {
    e.preventDefault();
    if (e.target.name === "sub-breeds") {
      setSubBreedChoice(e.target.value);
    } else {
      setBreedChoice(e.target.value);
      setSubBreedChoice("");
    }
  };

  //manage if choice is complet (complet if no sub-breed or wait sub-breed choice)
  const checkChoiceOk = (choiceOk) => {
    setCompleteChoice(choiceOk);
  };

  const handleGameState = (array) => {
    setGameState(array);
  };

  //manage api error
  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className="App">
      <h1>Dog Memory Game</h1>
      <Selection
        breedChoice={breedChoice}
        subBreedChoice={subBreedChoice}
        handleChoices={handleChoices}
        handleError={handleError}
        checkChoiceOk={checkChoiceOk}
        randomPic={
          selectedPic
            ? selectedPic[Math.floor(Math.random()) * selectedPic.length]
            : null
        }
      />
      <GameBoard
        selectedPic={selectedPic}
        gameState={gameState}
        handleGameState={handleGameState}
        errorMessage={error}
      />
    </div>
  );
}

export default App;
