import axios from "axios";

export const fetchValues = async (count) => {
  const API = `https://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=${count}`;

  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
