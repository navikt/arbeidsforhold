import fetchMock from "fetch-mock";
import {apiUrl} from "../../utils/environment";
import arbeidsforhold from "./arbeidsforhold.json"

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};

export const setUpMock = async () => {
  fetchMock.get(
    `${apiUrl}/arbeidsforhold`,
    delay(200, 500).then(() => arbeidsforhold)
  );
};
