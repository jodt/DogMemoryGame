const errorMessage = "Ooops....Il y a un problème....";

// retieve dog breeds
const retrieveBreeds = async () => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    if (!response.ok) {
      throw new Error(errorMessage);
    }
    const jsonresponse = await response.json();
    return jsonresponse.message;
  } catch (err) {
    return err.message;
  }
};

// retieve dog picture
const retrievePict = async (breedChoice, subBreedChoice = null) => {
  try {
    let response;
    if (!subBreedChoice) {
      response = await fetch(
        `https://dog.ceo/api/breed/${breedChoice}/images/random/10`
      );
      if (!response.ok) {
        throw new Error(errorMessage);
      }
    } else {
      response = await fetch(
        `https://dog.ceo/api/breed/${breedChoice}/${subBreedChoice}/images/random/10`
      );
      if (!response.ok) {
        throw new Error(errorMessage);
      }
    }
    const jsonresponse = await response.json();
    return jsonresponse.message;
  } catch (err) {
    return err.message;
  }
};

export { retrievePict, retrieveBreeds };
