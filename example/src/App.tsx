import React, { useState } from "react";
import Miljo from "../../src/types/miljo";
import {
  ListeMedArbeidsforhold,
  DetaljertArbeidsforhold
} from "@navikt/arbeidsforhold";
import { AlertStripeInfo } from "nav-frontend-alertstriper";

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
        <div className="example__sprak-velger">
          {locales.map((locale, i) =>
            valgtLocale === locale ? (
              <span key={i} className="example__sprak">
                <b>{locale}</b>
              </span>
            ) : (
              <span
                key={i}
                className="example__sprak"
                onClick={() => settValgtLocale(locale as "nb" | "en")}
              >
                {locale}
              </span>
            )
          )}
        </div>
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
            <AlertStripeInfo>
              Velg arbeidsforhold for å vise detaljene
              <span role="img" aria-label="Smiley">
                😊
              </span>
              <br />
              Denne informasjonsboksen er kun en del av eksempelet.
            </AlertStripeInfo>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
