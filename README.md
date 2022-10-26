# NAV Arbeidsforhold

[![npm version](https://badge.fury.io/js/%40navikt%2Farbeidsforhold.svg)](https://badge.fury.io/js/%40navikt%2Farbeidsforhold) |

NPM-modul med React-komponenter som viser brukerens arbeidsforhold

## Installasjon

```
npm install @navikt/arbeidsforhold
```

## Komponenter

Prosjektet er delt opp i uavhengige moduler som kan importeres

#### Liste med arbeidsforhold

```js
import { ListeMedArbeidsforhold } from "@navikt/arbeidsforhold";
```

<img alt="Screenshot av liste med arbeidsforhold" src="screenshots/ListeMedArbeidsforhold.png" width="60%"/>

Eksempel

```js
  onClick = {
    type: "KNAPP",
    getId: (arbeidsforholdId: string) => console.log(arbeidsforholdId)
  };

  return <ListeMedArbeidsforhold
            locale={"nb" as "nb" | "en"}
            miljo={"DEV" as "LOCAL" | "DEV" | "PROD"}
            onClick={this.onClick} />;
```

Onclick støtter følgende variasjoner

```js
  | {
      type: "INGEN_ON_CLICK";
    }
  | {
      type: "LENKE";
      href: string;
    }
  | {
      type: "REACT_ROUTER_LENKE";
      Component: typeof Link;
      to: string;
    }
  | {
      type: "KNAPP";
      getId: (navArbeidsforholdId: number) => void;
    };
```

Ved implementasjon av REACT_ROUTER_LENKE må {Link} importeres fra react-router-dom i rot-applikasjonen. <br>
Se komplett eksempel under mappen <i>/example</i>

#### Detaljert arbeidsforhold

```js
import { Detaljert } from "@navikt/arbeidsforhold";
```

<img alt="Screenshot av detaljert arbeidsforhold" src="screenshots/DetaljertArbeidsforhold.png" width="60%"/>

Eksempel

```js
render = () => {
  const id = "82421242";
  const locale = "nb" as "nb" | "en";
  const miljo = "DEV" as "LOCAL" | "DEV" | "PROD";
  const rolle = "ARBEIDSTAKER" as "ARBEIDSTAKER" | "ARBEIDSGIVER"

  return <Detaljert
            navArbeidsforholdId={id}
            locale={locale}
            miljo={miljo}
            rolle={rolle} />;
};
```

Komponenten vil hente data fra arbeidsforhold-api basert på miljo-variabelen, med mindre customApiUrl er satt.
CustomApiUrl må inneholde {id} som erstattes av navArbeidsforholdId.
Eksempel: "https://din-api-proxy.nav.no/arbeidsforhold/{id}"

## Videreutvikling / test

- Hent repoet fra github

```
git clone https://github.com/navikt/arbeidsforhold.git
```

- Installer nødvendige pakker, start mock-container og start applikasjonen

```
npm install && docker-compose up -d && npm start
```

Test-applikasjonen består av en simpel create-react-app som importerer og benytter pakkene <br>
Prosjektet støtter hot-reloading, endringer i komponentene vil føre til at test-applikasjonen oppdateres

## Publisering

Publiseres til Github Packages med [Github Actions](https://github.com/navikt/arbeidsforhold/actions)

## Logging

Vi bruker fo-frontendlogger for logging. For oppslag i kibana:

```
application:frontendlogger AND x_appname:arbeidsforhold
```

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/team-personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
