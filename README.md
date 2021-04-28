# NAV Arbeidsforhold

[![npm version](https://badge.fury.io/js/%40navikt%2Farbeidsforhold.svg)](https://badge.fury.io/js/%40navikt%2Farbeidsforhold) |
![Deploy-to-npm](https://github.com/navikt/arbeidsforhold/workflows/Deploy-to-npm/badge.svg) |
![Deploy-to-dev](https://github.com/navikt/arbeidsforhold/workflows/Deploy-to-dev/badge.svg)

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

- Installer nødvendige pakker, start mock-container og start applikasjonen

```
npm install && docker-compose up -d && npm start
```

Test-applikasjonen består av en simpel create-react-app som importerer og benytter pakkene <br>
Prosjektet støtter hot-reloading, endringer i komponentene vil føre til at test-applikasjonen oppdateres

## Deployering

### Dev

1. Besøk https://github.com/navikt/personopplysninger/actions
2. Velg workflow `Deploy-to-web` og deretter `Run workflow`. Husk å velge hvilken branch du ønsker å deploye til dev.

_eller_

Benytt [Github CLI](https://cli.github.com/) for å deploye via kommandolinjen:

`gh workflow run workflow_dispatch -b <navn_på_branch>`

Push deretter den nye versjonen til Github, som vil plukkes opp av [Github Actions](https://github.com/navikt/arbeidsforhold/actions).

### Prod

Deploy til prod trigges når du tagger og pusher en ny versjon. Husk å skrive en kort beskrivelse slik at det er enkelt å sporte endringer historisk fra én versjon til en annen.

1. Opprett PR og be om review fra en kollega.
2. Merge godkjent PR inn i master.
3. `npm version [minor | patch] -m "%s: Noen få ord om endringene som er gjort."`
4. Gå til repoet og publiser en ny release _eller_ bruk kommandolinjen: `gh release create vx.x.x -t "Tittel på release"`

#### Om semver

`npm version patch` vil bumpe versjon fra feks v1.1.1 til v1.1.2. Diskuter med teamet om versjonen er en minor eller kun en patch. Hvis minor bruker du `npm version minor` istedet. Du kan lese mer på [semver.org](https://semver.org/)

## Logging

Vi bruker fo-frontendlogger for logging. For oppslag i kibana:

```
application:frontendlogger AND x_appname:arbeidsforhold
```

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/team-personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
