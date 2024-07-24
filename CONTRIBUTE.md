# Bidra med utvikling

## Utvikling lokalt

Hent ned repoet med `git clone git@github.com:navikt/arbeidsforhold.git`

I terminalen kjør følgende kommandoer

```
  npm install
  docker-compose up -d && npm start
  npm start
```

(docker-compose kjører opp nødvendige mocks og oidc-provider)

Arbeidsforhold er kun npm-pakker som skal konsumeres av andre applikasjoner. For å vise denne pakken i nettleser, blir den åpnet via eksempelapplikasjonen (ligger i `/example`-mappen). Det er denne eksempelapplikasjonen som starter opp når du kjører `npm start`.

Prosjektet støtter hot-reloading, endringer i komponentene vil føre til at test-applikasjonen oppdateres.

## Publisering

Benytt fanen "Actions" og deploy-jobben "Beta" for å publisere nye betaer, enten som patch, minor eller major. Merk at pakken publiseres i Github Packages og ikke Npmjs.
Du finner [mer informasjon om semver her](https://docs.npmjs.com/about-semantic-versioning) dersom du er usikker på om du skal velge patch, minor eller major.
