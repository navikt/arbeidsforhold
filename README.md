# Nav Arbeidsforhold

NPM-modul med React-komponenter som viser brukerens arbeidsforhold

## Installasjon

```
npm install @navikt/arbeidsforhold
```

### Peke til korrekt pakkeregister

Merk at pakken er publisert til Github Package Registry (npm.pkg.github.com) og ikke npmjs.com. Det betyr at du i roten av prosjektet ditt
må legge inn .npmrc med følgende innhold:

```
@navikt:registry=https://npm.pkg.github.com
```

## Komponenter

Prosjektet er delt opp i uavhengige moduler som kan importeres

#### Liste med arbeidsforhold

```js
import { ListeMedArbeidsforhold } from '@navikt/arbeidsforhold';
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
import { Detaljert } from '@navikt/arbeidsforhold';
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

#### CSS

CSS må importeres spesifikt, feks i index.tsx eller app.tsx i applikasjonen din:

```
@import '@navikt/arbeidsforhold/style.css'
```

## Logging

Vi bruker fo-frontendlogger for logging. For oppslag i kibana:

```
application:frontendlogger AND x_appname:arbeidsforhold
```

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/team-personbruker

## For Nav-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
