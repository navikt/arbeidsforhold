import fetchMock from "fetch-mock";
import afDetaljert from "./af-detaljert.json";
import Environment from "../../utils/environment";

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};

export const setUpMock = async () => {
  fetchMock.get(
    `${Environment.apiUrl}/arbeidsforhold`,
    delay(250, 1250).then(() => 500)
  );
  fetchMock.get(
    `begin:${Environment.apiUrl}/arbeidsforholdinnslag`,
    delay(250, 1250).then(() => afDetaljert)
  );
};
