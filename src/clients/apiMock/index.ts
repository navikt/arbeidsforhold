import fetchMock from "fetch-mock";
import afListe from "./af-liste.json";
import afDetaljert from "./af-detaljert.json";
import Environment from "../../utils/environment";

const environment = Environment();
const apiUrl = environment.apiUrl;

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};

export const setUpMock = async () => {
  fetchMock.get(
    `${apiUrl}/arbeidsforhold`,
    delay(250, 1250).then(() => afListe)
  );
  fetchMock.get(
    `begin:${apiUrl}/arbeidsforholdinnslag`,
    delay(250, 1250).then(() => afDetaljert)
  );
};
