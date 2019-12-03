import Miljo from "../types/miljo";

class Environment {
  static apiUrl: string;
  static loginUrl: string;
  static logoutUrl: string;

  static settEnv = (miljo: Miljo) => {
    switch (miljo) {
      default:
      case "LOCAL":
        Environment.apiUrl = `http://localhost:8080/person/arbeidsforhold-api`;
        Environment.loginUrl = `https://loginservice-q.nav.no/login`;
        Environment.logoutUrl = `https://loginservice-q.nav.no/slo`;
        break;
      case "Q0":
      case "Q1":
      case "Q2":
      case "Q6":
        Environment.apiUrl = `https://www-${miljo.toLowerCase()}.nav.no/person/arbeidsforhold-api`;
        Environment.loginUrl = `https://loginservice-q.nav.no/login`;
        Environment.logoutUrl = `https://loginservice-q.nav.no/slo`;
        break;
      case "PROD":
        Environment.apiUrl = `https://www.nav.no/person/arbeidsforhold-api`;
        Environment.loginUrl = `https://loginservice.nav.no/login`;
        Environment.logoutUrl = `https://loginservice.nav.no/slo`;
        break;
    }
  };
}

export default Environment;
