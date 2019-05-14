import fetchMock from "fetch-mock";
import { apiUrl } from "../../utils/environment";
import afListe from "./af-liste.json";
import afDetaljert from "./af-detaljert.json";

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};

export const setUpMock = async () => {
  fetchMock.get(
    `${apiUrl}/arbeidsforhold`,
    delay(500, 900).then(() => afListe)
  );
  fetchMock.get(
    `begin:${apiUrl}/arbeidsforholdinnslag`,
    delay(500, 900).then(() => afDetaljert)
  );
};
