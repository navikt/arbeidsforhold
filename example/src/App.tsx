import React, { useState } from "react";
import Miljo from "../../src/types/miljo";
import {
  ListeMedArbeidsforhold,
  DetaljertArbeidsforhold
} from "@navikt/arbeidsforhold";

const App = () => {
  const { hostname } = window.location;
  const miljo = (hostname.indexOf("localhost") > -1 ? "LOCAL" : "DEV") as Miljo;

  const [valgtArbeidsforholdId, settValgtArbeidsforholdId] = useState();

  const arbeidsforholdOnClick = (navArbeidsforholdId: number) => {
    console.log(`Clicked on ${navArbeidsforholdId}`);
    settValgtArbeidsforholdId(navArbeidsforholdId);
  };

  return (
    <div className="example__app">
      <div className="example__content">
        <div className="example__section">
          <ListeMedArbeidsforhold
            miljo={miljo}
            onClick={arbeidsforholdOnClick}
          />
        </div>
        <div className="example__section">
          <DetaljertArbeidsforhold
            miljo={miljo}
            navArbeidsforholdId={valgtArbeidsforholdId}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
