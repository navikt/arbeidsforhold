import { logApiError } from '../utils/logger';
import { Environment } from '../utils/environment';

const parseJson = (data: any) => data.json();

const sendTilLogin = () => new Promise(() => window.location.assign(`${Environment.loginUrl}?redirect=${window.location.href}`));

const sjekkAuth = (response: Response): Response | Promise<any> =>
    response.status === 401 || response.status === 403 || (response.status === 0 && !response.ok) ? sendTilLogin() : response;

const sjekkForFeil = (url: string, response: Response, reject: (reason?: any) => void) =>
    response.ok
        ? response
        : (logApiError(url, response),
          reject({
              code: response.status,
              text: response.statusText,
          }));

const hentJsonOgSjekkAuth = (url: string, headers?: object) =>
    new Promise((resolve, reject) =>
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                ...headers,
            },
            credentials: 'include',
        })
            .then(sjekkAuth)
            .then((response) => sjekkForFeil(url, response, reject))
            .then(parseJson)
            .then(resolve)
            .catch(reject)
    );

export const hentListeMedArbeidsforhold = (customApiUrl?: string) => {
    const defaultApiUrl = `${Environment.apiUrl}/arbeidsforhold`;
    return hentJsonOgSjekkAuth(customApiUrl || defaultApiUrl);
};

// Henter fødselsnummer fra token
export const hentDetaljertArbeidsforholdArbeidstaker = (id: number, customApiUrl?: string) => {
    const defaultApiUrl = `${Environment.apiUrl}/arbeidsforholdinnslag/arbeidstaker/{id}`;
    const apiUrl = (customApiUrl || defaultApiUrl).replace('{id}', id.toString());
    return hentJsonOgSjekkAuth(apiUrl);
};

// Bruker tokenet til arbeidsgiver
export const hentDetaljertArbeidsforholdArbeidsgiver = (fnr: string, id: number, customApiUrl?: string) => {
    const defaultApiUrl = `${Environment.apiUrl}/arbeidsforholdinnslag/arbeidsgiver/{id}`;
    const apiUrl = (customApiUrl || defaultApiUrl).replace('{id}', id.toString());
    return hentJsonOgSjekkAuth(apiUrl, { 'Fnr-Arbeidstaker': `${fnr}` });
};
