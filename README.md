# NAV Arbeidsforhold

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

onClick = (arbeidsforoldId: string) =>
    console.log(arbeidsforholdId);

render = () => {
  return <ListeMedArbeidsforhold
            miljo={"DEV" as "LOCAL" | "DEV" | "PROD"}
            onClick={this.onClick} />;
};
```

#### Detaljert arbeidsforhold

```js
import { DetaljertArbeidsforhold } from "@navikt/arbeidsforhold";
```

<img alt="Screenshot av detaljert arbeidsforhold" src="screenshots/DetaljertArbeidsforhold.png" width="60%"/>

Eksempel

```js
render = () => {
  const mijo = "DEV" as "LOCAL" | "DEV" | "PROD";
  const arbeidsforholdId = "konvertert_af709505-128e-45dc-a241-7e14180f787d";

  return <DetaljertArbeidsforhold
            miljo={miljo}
            arbeidsforholdId={arbeidsforholdId} />;
};
```

Komponenten vil hente data fra arbeidsforhold-api basert på miljo-variabelen

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

## Logging

Vi bruker fo-frontendlogger for logging. For oppslag i kibana:

```
application:frontendlogger AND x_appname:arbeidsforhold
```

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/team-personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
