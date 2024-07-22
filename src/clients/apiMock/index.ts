import fetchMock from 'fetch-mock';
import afListe from './af-liste.json';
import afDetaljert from './af-detaljert.json';
import { Environment } from '../../utils/environment';

const delay = (min: number, max: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, Math.random() * (max - min) + min);
    });
};

export const setUpMock = () => {
    // Config
    fetchMock.config.fallbackToNetwork = true;
    // Routes
    fetchMock.get(
        `${Environment.apiUrl}/arbeidsforhold`,
        delay(250, 1250).then(() => afListe)
    );
    fetchMock.get(
        `begin:${Environment.apiUrl}/arbeidsforholdinnslag`,
        delay(250, 1250).then(() => afDetaljert)
    );
};
