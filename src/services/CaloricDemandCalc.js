export const checkInputs = (userInput) => {
  const unfilledInputs =
    Object.keys(userInput).filter((key) => !userInput[key]);

  return unfilledInputs;
}

const isFormCompleted = (userInput) => {
  const res = checkInputs(userInput);
  return !res.length;
}

export const calcData = async (userInput) => {
  if(!isFormCompleted(userInput)) {
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/calc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
    });

    return response.json();
  } catch (err) {
    console.warn(err);
    return null;
  }
}

export const getInitData = async () => {
  try {
    const response = await fetch('http://localhost:3000/inputs-data')
    
    return response.json();
  } catch (err) {
    console.warn(err);
    return {};
  }
}
