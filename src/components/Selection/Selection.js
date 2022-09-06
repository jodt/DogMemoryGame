import React, { useEffect, useState } from "react";
import { retrieveBreeds } from "../../Api/Api";
import "./Selection.scss";

export default function Selection({
  breedChoice,
  subBreedChoice,
  handleChoices,
  handleError,
  checkChoiceOk,
  randomPic,
}) {
  const [breeds, Setbreeds] = useState();
  const [subBreeds, setSubBreeds] = useState();

  //retrieve breeds
  useEffect(() => {
    const getBreeds = async () => {
      let breeds = await retrieveBreeds();
      if (typeof breeds === "object") {
        Setbreeds(breeds);
      } else {
        handleError(breeds);
      }
    };
    getBreeds();
  }, []);

  //retrieve sub-breeds if exist else choice is complete
  useEffect(() => {
    if (breeds && breeds[breedChoice] && breeds[breedChoice].length) {
      setSubBreeds(breeds[breedChoice]);
    } else if (breedChoice && !subBreeds) {
      checkChoiceOk("complet");
    }
  }, [breeds, breedChoice]);

  useEffect(() => {
    if (subBreeds) {
      checkChoiceOk("incomplet");
    }
  }, [subBreeds]);

  // handle the value of select tags
  const handleChange = (e) => {
    if (e.target.name === "breeds") {
      setSubBreeds();
    }
    handleChoices(e);
  };

  return (
    <div className="SelectionContainer">
      <div className="Selection">
        <div>
          <label htmlFor="breeds-select">Choisissez la race de chien</label>
          <select
            id="breeds-select"
            name="breeds"
            value={breedChoice}
            onChange={handleChange}
          >
            <option value="">--Please choose an option--</option>
            {breeds &&
              Object.keys(breeds).map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
          </select>
        </div>
        {subBreeds && (
          <div>
            <label htmlFor="sub-breeds-select">Choisissez la sous-race</label>
            <select
              id="sub-breeds-select"
              name="sub-breeds"
              value={subBreedChoice}
              onChange={handleChange}
            >
              <option value="">--Please choose an option--</option>
              {subBreeds.map((subBreed) => (
                <option key={subBreed} value={subBreed}>
                  {subBreed}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="RandomPic">
        <img src={randomPic} width="100%" height="auto"></img>
      </div>
    </div>
  );
}
