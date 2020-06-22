import React, { useState } from "react";
import Miljo from "../../src/types/miljo";
import { DetaljertArbeidsforhold } from "@navikt/arbeidsforhold";
import { ListeMedArbeidsforhold } from "@navikt/arbeidsforhold";
import InfoBoks from "./components/InfoBoks";
import SprakVelger from "./components/SprakVelger";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import { AFListeOnClick } from "../../src/modules/af-liste";
import OnClickVelger from "./components/OnClickVelger";
import { Normaltekst } from "nav-frontend-typografi";

const App = () => {
  const { hostname } = window.location;
  const miljo = (hostname.indexOf("localhost") > -1 ? "LOCAL" : "Q0") as Miljo;
  const locales = ["nb", "en"];

  const printActivated = true;
  const printName = "Ola Nordmann";
  const printSSN = "12345678911";

  const [valgtArbeidsforholdId, settValgtArbeidsforholdId] = useState<number>();
  const [valgtLocale, settValgtLocale] = useState("nb" as "nb" | "en");

  const arbeidsforholdOnClick = (navArbeidsforholdId: number) => {
    console.log(`Clicked on ${navArbeidsforholdId}`);
    settValgtArbeidsforholdId(navArbeidsforholdId);
  };

  const onClicks = [
    {
      type: "KNAPP",
      getId: arbeidsforholdOnClick,
    },
    {
      type: "LENKE",
      href: "/arbeidsforhold/{id}",
    },
    {
      type: "REACT_ROUTER_LENKE",
      Component: Link,
      to: "/arbeidsforhold/{id}",
    },
    {
      type: "INGEN_ON_CLICK",
    },
  ] as AFListeOnClick[];

  const [valgtOnClick, settValgtOnClick] = useState(onClicks[0]);
  return (
    <div className="example__app">
      <div className="example__content">
        <Router>
          <div className={"example__header"}>
            <h2>Arbeidstakere</h2>
          </div>
          <SprakVelger
            locales={locales}
            valgtLocale={valgtLocale}
            settValgtLocale={settValgtLocale}
          />
          <OnClickVelger
            onClicks={onClicks}
            valgtOnClick={valgtOnClick}
            settValgtOnClick={settValgtOnClick}
          />
          <div className="example__section">
            <ListeMedArbeidsforhold
              miljo={miljo}
              locale={valgtLocale}
              onClick={valgtOnClick}
              printActivated={printActivated}
              printName={printName}
              printSSN={printSSN}
            />
          </div>
          <div className="example__section">
            {valgtArbeidsforholdId ? (
              <DetaljertArbeidsforhold
                rolle={"ARBEIDSTAKER"}
                miljo={miljo}
                locale={valgtLocale}
                navArbeidsforholdId={valgtArbeidsforholdId}
                printActivated={printActivated}
                printName={printName}
                printSSN={printSSN}
              />
            ) : (
              <InfoBoks />
            )}
          </div>
          <div className={"example__header"}>
            <h2>Arbeidsgivere</h2>
            <Normaltekst>
              Logg inn med 16120101181. <br />
              Viser arbeidsforhold 47720602 for arbeidstaker 27127424204
            </Normaltekst>
          </div>
          <div className="example__section">
            <DetaljertArbeidsforhold
              rolle={"ARBEIDSGIVER"}
              miljo={miljo}
              locale={valgtLocale}
              fnrArbeidstaker={`${27127424204}`}
              navArbeidsforholdId={47720602}
            />
          </div>
        </Router>
      </div>
    </div>
  );
};

export default App;
