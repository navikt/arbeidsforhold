import React, { useState } from "react";
import Miljo from "../../src/types/miljo";
import {
  ListeMedArbeidsforhold,
  DetaljertArbeidsforhold
} from "@navikt/arbeidsforhold";
import InfoBoks from "./components/InfoBoks";
import SprakVelger from "./components/SprakVelger";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import { AFListeOnClick } from "../../src/modules/af-liste";
import OnClickVelger from "./components/OnClickVelger";

const App = () => {
  const { hostname } = window.location;
  const miljo = (hostname.indexOf("localhost") > -1 ? "LOCAL" : "Q0") as Miljo;
  const locales = ["nb", "en"];

  const [valgtArbeidsforholdId, settValgtArbeidsforholdId] = useState();
  const [valgtLocale, settValgtLocale] = useState("nb" as "nb" | "en");

  const arbeidsforholdOnClick = (navArbeidsforholdId: number) => {
    console.log(`Clicked on ${navArbeidsforholdId}`);
    settValgtArbeidsforholdId(navArbeidsforholdId);
  };

  const onClicks = [
    {
      type: "KNAPP",
      getId: arbeidsforholdOnClick
    },
    {
      type: "LENKE",
      href: "/arbeidsforhold/{id}"
    },
    {
      type: "REACT_ROUTER_LENKE",
      Component: Link,
      to: "/arbeidsforhold/{id}"
    },
    {
      type: "INGEN_ON_CLICK"
    }
  ] as AFListeOnClick[];

  const [valgtOnClick, settValgtOnClick] = useState(onClicks[0]);
  return (
    <div className="example__app">
      <div className="example__content">
        <Router>
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
              locale={valgtLocale}
              miljo={miljo}
              onClick={valgtOnClick}
            />
          </div>
          <div className="example__section">
            {valgtArbeidsforholdId ? (
              <DetaljertArbeidsforhold
                locale={valgtLocale}
                miljo={miljo}
                navArbeidsforholdId={valgtArbeidsforholdId}
              />
            ) : (
              <InfoBoks />
            )}
          </div>
        </Router>
      </div>
    </div>
  );
};

export default App;
