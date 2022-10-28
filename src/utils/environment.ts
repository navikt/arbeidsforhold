import { Miljo } from "../types/miljo";

export class Environment {
  static apiUrl: string;
  static loginUrl: string;

  static settEnv = (miljo: Miljo) => {
    switch (miljo) {
      default:
      case "LOCAL":
        Environment.apiUrl = `http://localhost:8096/person/arbeidsforhold-api`;
        Environment.loginUrl = `http://localhost:5000`;
        break;
      case "DEV":
        Environment.apiUrl = `https://person.dev.nav.no/person/arbeidsforhold-api`;
        Environment.loginUrl = `https://loginservice.dev.nav.no`;
        break;
      case "PROD":
        Environment.apiUrl = `https://www.nav.no/person/arbeidsforhold-api`;
        Environment.loginUrl = `https://loginservice.nav.no/login`;
        break;
    }
  };
}
