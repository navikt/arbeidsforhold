import React, { useState } from "react";
import Miljo from "../../src/types/miljo";
import {
  ListeMedArbeidsforhold,
  DetaljertArbeidsforhold
} from "@navikt/arbeidsforhold";

const App = () => {
  const { hostname } = window.location;
  const miljo = (hostname.indexOf("localhost") > -1 ? "LOCAL" : "DEV") as Miljo;

  const [valgtArbeidsforholdId, settValgtArbeidsforholdId] = useState(
    "konvertert_af709505-128e-45dc-a241-7e14180f787d"
  );

  const arbeidsforholdOnClick = (arbeidsforoldId: string) => {
    console.log(`Clicked on ${arbeidsforoldId}`);
    settValgtArbeidsforholdId(arbeidsforoldId);
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
            arbeidsforholdId={valgtArbeidsforholdId}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
