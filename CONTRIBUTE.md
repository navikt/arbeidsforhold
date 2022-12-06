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

Merk at pakken publiseres i Github Packages og ikke Npmjs. Dersom du ikke har autentisert npm cli mot GHP, gjør du det med
`npm login --registry=https://npm.pkg.github.com`
Du finner [mer informasjon om autentisering mot Github Packages her](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).

### Publisering av betaversjon

1. Husk å oppdatere branchen din slik at den ikke ligger etter master. (`git fetch` henter alle brancher.)
2. For ordens skyld, commit alle endringene i forkant.
3. `npm run publish:prepatch` | `npm run publish:preminor` | `npm run publish:premajor`

Du finner [mer informasjon om semver her](https://docs.npmjs.com/about-semantic-versioning) dersom du er usikker på om du skal velge prepatch, preminor eller premajor.

Beta-versjonen du har publisert blir gjort tilgjengelig som `x.x.x-beta.x` og kan hentes inn som en spesifikk versjon i den konsumerende applikasjonen, feks

`npm install @navikt/arbeidsforhold@1.9.0-beta.0`.

## Publisering av flere betaer

Enkelte ganger er det nødvendig å publisere flere betaer iløpet av testingen, feks `x.x.x-beta.0`, `x.x.x-beta.1`, `x.x.x-beta.2` osv. Etter å ha publisert første beta (se ovenfor) kan du 'betabumpe' pakken med

`npm version prerelease`
og deretter
`npm publish --access public --tag beta`

### Publisering av ny versjon

1. Publisering av ny versjon skjer fra master. Dvs at alle relevante brancher må være merget inn.
2. `npm run build`
3. `npm version patch | minor | major`
4. `npm publish --access public`

Du finner [mer informasjon om semver her](https://docs.npmjs.com/about-semantic-versioning) dersom du er usikker på om du skal velge patch, minor eller major.
