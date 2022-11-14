import { Alert } from "@navikt/ds-react";
import React from "react";

export const InfoBoks = () => (
  <Alert variant="info">
    Velg arbeidsforhold for å vise detaljene
    <span role="img" aria-label="Smiley">
      😊
    </span>
    <br />
    Denne informasjonsboksen er kun en del av eksempelet.
  </Alert>
);
