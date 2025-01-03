import fetchMock from 'fetch-mock';
import afListe from '@/assets/mockdata/af-liste.json';
import afDetaljert from '@/assets/mockdata/af-detaljert.json';
import { Environment } from '../../utils/environment';

const delay = (min: number, max: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, Math.random() * (max - min) + min);
    });
};

export const setUpMock = () => {
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
