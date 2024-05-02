import { Miljo } from '../types/miljo';

export class Environment {
    static apiUrl: string;
    static loginUrl: string;

    static settEnv = (miljo: Miljo) => {
        switch (miljo) {
            case 'LOCAL':
                Environment.apiUrl = `http://localhost:8096/person/arbeidsforhold-api`;
                Environment.loginUrl = `http://localhost:5000`;
                break;
            case 'DEV':
                Environment.apiUrl = `https://www.ansatt.dev.nav.no/person/arbeidsforhold-api`;
                Environment.loginUrl = `https://login.ekstern.dev.nav.no/oauth2/login`;
                break;
            case 'PROD':
                Environment.apiUrl = `https://www.nav.no/person/arbeidsforhold-api`;
                Environment.loginUrl = `https://login.nav.no/oauth2/login`;
                break;
            default:
        }
    };
}
