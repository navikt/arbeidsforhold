import React, { useState } from "react";
import Miljo from "../../src/types/miljo";
import {
  ListeMedArbeidsforhold,
  DetaljertArbeidsforhold
} from "@navikt/arbeidsforhold";
import InfoBoks from "./components/InfoBoks";
import SprakVelger from "./components/SprakVelger";

const App = () => {
  const { hostname } = window.location;
  const miljo = (hostname.indexOf("localhost") > -1 ? "LOCAL" : "DEV") as Miljo;
  const locales = ["nb", "en"];

  const [valgtArbeidsforholdId, settValgtArbeidsforholdId] = useState();
  const [valgtLocale, settValgtLocale] = useState("nb" as "nb" | "en");

  const arbeidsforholdOnClick = (navArbeidsforholdId: number) => {
    console.log(`Clicked on ${navArbeidsforholdId}`);
    settValgtArbeidsforholdId(navArbeidsforholdId);
  };

  return (
    <div className="example__app">
      <div className="example__content">
        <SprakVelger
          locales={locales}
          valgtLocale={valgtLocale}
          settValgtLocale={settValgtLocale}
        />
        <div className="example__section">
          <ListeMedArbeidsforhold
            locale={valgtLocale}
            miljo={miljo}
            onClick={arbeidsforholdOnClick}
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
      </div>
    </div>
  );
};

export default App;
