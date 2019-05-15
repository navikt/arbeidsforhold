import React, { useState } from "react";
import { Normaltekst, Element } from "nav-frontend-typografi";
import { HoyreChevron, NedChevron } from "nav-frontend-chevron";
import { AFListeProps, AFListeData } from "./index";

const Arbeidsforhold = (props: AFListeProps & AFListeData) => {
  const { arbeidsforhold, classNameContainer, onClick } = props;
  const [visAlle, settVisAlle] = useState(false);
  const toggleVisAlle = () => settVisAlle(!visAlle);
  return (
    <div
      className={`af-liste__container ${
        classNameContainer ? classNameContainer : ""
      }`}
    >
      <div className="af-liste__header">
        <div className="af-liste__kolonne af-liste__tittel">
          <Element>Arbeidsgiver</Element>
        </div>
        <div className="af-liste__kolonne">
          <Element>Startdato</Element>
        </div>
        <div className="af-liste__kolonne">
          <Element>Sluttdato</Element>
        </div>
        <div className="af-liste__kolonne" />
      </div>
      {arbeidsforhold
        .slice(0, visAlle ? arbeidsforhold.length : 5)
        .map(foretak => (
          <div
            className="af-liste__rad"
            key={foretak.arbeidsforholdId}
            onClick={() => onClick(foretak.arbeidsforholdId)}
          >
            <div className="af-liste__kolonne af-liste__tittel">
              <Normaltekst>
                {foretak.arbeidsgiver.organisasjonsnavn}
              </Normaltekst>
            </div>
            <div className="af-liste__kolonne">
              <Normaltekst>{foretak.ansettelsesPeriode.periodeFra}</Normaltekst>
            </div>
            <div className="af-liste__kolonne">
              <Normaltekst>{foretak.ansettelsesPeriode.periodeTil}</Normaltekst>
            </div>
            <div className="af-liste__kolonne">
              <HoyreChevron />
            </div>
          </div>
        ))}
      <div className="af-liste__vis-flere" onClick={toggleVisAlle}>
        Vis flere arbeidsforhold <NedChevron />
      </div>
    </div>
  );
};

export default Arbeidsforhold;
