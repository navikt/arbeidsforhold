# NAV Arbeidsforhold

[![npm version](https://badge.fury.io/js/%40navikt%2Farbeidsforhold.svg)](https://badge.fury.io/js/%40navikt%2Farbeidsforhold) <br>
![Deploy-to-npm](https://github.com/navikt/arbeidsforhold/workflows/Deploy-to-npm/badge.svg)
![Deploy-to-q0](https://github.com/navikt/arbeidsforhold/workflows/Deploy-to-q0/badge.svg)
![Deploy-to-q1](https://github.com/navikt/arbeidsforhold/workflows/Deploy-to-q1/badge.svg)
![Deploy-to-q6](https://github.com/navikt/arbeidsforhold/workflows/Deploy-to-q6/badge.svg)

React moduler / mikro-frontends som viser brukerens arbeidsforhold

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
import { DetaljertArbeidsforhold } from "@navikt/arbeidsforhold";
```

<img alt="Screenshot av detaljert arbeidsforhold" src="screenshots/DetaljertArbeidsforhold.png" width="60%"/>

Eksempel

```js
render = () => {
  const id = "82421242";
  const locale = "nb" as "nb" | "en";
  const miljo = "DEV" as "LOCAL" | "DEV" | "PROD";
  const rolle = "ARBEIDSTAKER" as "ARBEIDSTAKER" | "ARBEIDSGIVER"

  return <DetaljertArbeidsforhold
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

- Installer nødvendige pakker og start kompilering

```
npm install && npm start
```

- Start test applikasjonen <br>

```
cd example && npm install && npm start
```

Test-applikasjonen består av en simpel create-react-app som importerer og benytter pakkene <br>
Prosjektet støtter hot-reloading, endringer i komponentene vil føre til at test-applikasjonen oppdateres

## Deployering

Applikasjonen bygges til dev ved git tag på formatet `vX.X.X-test` (Q1 og Q6) eller `vX.X.X-dev` (Q6). <br>
For å lansere applikasjonen til [npmjs](https://www.npmjs.com/package/@navikt/arbeidsforhold), benytt [npm version](https://docs.npmjs.com/cli/version) til å oppdatere package.json og lage en ny git-tag. Eks:

```
npm version patch -m "Din melding"
```

Push deretter den nye versjonen til Github, som vil plukkes opp av [CircleCI](https://circleci.com/gh/navikt/workflows/arbeidsforhold).

```
git push && git push --tags
```

## Logging

Vi bruker fo-frontendlogger for logging. For oppslag i kibana:

```
application:frontendlogger AND x_appname:arbeidsforhold
```

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/team-personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
