import React, { useState } from "react";

import {
  ListeMedArbeidsforhold,
  DetaljertArbeidsforhold
} from "@navikt/arbeidsforhold";
import Miljo from "../../src/types/miljo";

const App = () => {
  const [valgtArbeidsforholdId, settValgtArbeidsforholdId] = useState(
    "konvertert_af709505-128e-45dc-a241-7e14180f787d"
  );

  const miljo = (window.location.hostname.indexOf("localhost") > -1
    ? "LOCAL"
    : "DEV") as Miljo;

  const arbeidsforholdOnClick = (arbeidsforoldId: string) =>
    settValgtArbeidsforholdId(arbeidsforoldId);

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
