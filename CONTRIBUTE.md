# Bidra med utvikling

## Utvikling lokalt

Hent ned repoet med `git clone git@github.com:navikt/arbeidsforhold.git`

I terminalen kjør følgende kommandoer

```
  npm install
  docker-compose up -d
  npm start
```

(docker-compose starter dekoratøren, mocks og oidc-provider)

Arbeidsforhold er kun npm-pakker som skal brukes av andre applikasjoner. For å vise denne pakken i nettleser, blir den åpnet via eksempelapplikasjonen som ligger i `/example`-mappen. Det er denne eksempelapplikasjonen som starter opp når du kjører `npm start`.

Prosjektet støtter hot-reloading, endringer i komponentene vil føre til at eksempel-applikasjonen oppdateres.

## Publisering

Benytt fanen "Actions" og deploy-jobben "Beta" for å publisere nye betaer, enten som patch, minor eller major. Merk at pakken publiseres i Github Packages og ikke Npmjs.

### Versjonering

Det er viktig å følge semver-prinsippene når du velger hvilken versjon du øker til. Du finner [mer informasjon om semver her](https://docs.npmjs.com/about-semantic-versioning) dersom du er usikker på om du skal velge patch, minor eller major.

-   Major: Arbeidsforhold har såkalte "breaking changes" som kan gjøre at den slutter å fungere hvis man ikke gjør nødvendige tilpassinger i applikasjonen sin.
-   Minor: Relativt mange endringer og nye funksjoner, men alle skal i utgangspunktet være bakoverkompatible.
-   Patch: Kun feilretting og ingen funksjonsendring eller nye funksjoner.
