import { render } from "@testing-library/react";
import { Liste } from "../modules/af-liste/Liste";
import afListe from "../clients/apiMock/af-liste.json";
import { AFSimpel, AFUtvidet } from "../types/arbeidsforhold";
import moment from "moment";
import { Detaljert } from "../modules/af-detaljert/Detaljert";
import afDetaljert from "../clients/apiMock/af-detaljert.json";

export function renderDetaljertArbeidsforhold() {
  render(
    <Detaljert
      rolle={"ARBEIDSTAKER"}
      locale={"nb"}
      miljo={"LOCAL"}
      navArbeidsforholdId={1}
      printActivated={true}
      printSSN={"12345678911"}
      printName={"Ola Nordmann"}
      arbeidsforhold={afDetaljert as AFUtvidet}
    />
  );
}

export function renderListeOverArbeidsforhold() {
  render(
    <Liste
      locale={"nb"}
      miljo={"LOCAL"}
      onClick={{ type: "INGEN_ON_CLICK" }}
      arbeidsforhold={afListe as unknown as AFSimpel[]}
    />
  );
}

export function formatDate(date: string, format = "DD.MM.YYYY") {
  return moment(date).locale("nb").format(format);
}
