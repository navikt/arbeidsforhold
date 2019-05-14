import React from "react";
import { Normaltekst, Element } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import { HoyreChevron } from "nav-frontend-chevron";
import { AFListeProps, AFListeData } from "./index";

const Arbeidsforhold = (props: AFListeProps & AFListeData) => {
  const { arbeidsforhold, classNameContainer, onClick } = props;
  return (
    <div
      className={`arbeidsforhold__container ${
        classNameContainer ? classNameContainer : ""
      }`}
    >
      <div className="oversikt__rad">
        <div className="oversikt__kolonne oversikt__tittel">
          <Element>Arbeidsgiver</Element>
        </div>
        <div className="oversikt__kolonne">
          <Element>Startdato</Element>
        </div>
        <div className="oversikt__kolonne">
          <Element>Sluttdato</Element>
        </div>
        <div className="oversikt__kolonne" />
      </div>
      {arbeidsforhold.map(foretak => (
        <div className="oversikt__rad" key={foretak.arbeidsforholdId}>
          <div className="oversikt__kolonne oversikt__tittel">
            <Normaltekst>{foretak.arbeidsgiver.organisasjonsnavn}</Normaltekst>
          </div>
          <div className="oversikt__kolonne">
            <Normaltekst>{foretak.ansettelsesPeriode.periodeFra}</Normaltekst>
          </div>
          <div className="oversikt__kolonne">
            <Normaltekst>{foretak.ansettelsesPeriode.periodeTil}</Normaltekst>
          </div>
          <div className="oversikt__kolonne">
            <Lenke href={`#`} onClick={() => onClick(foretak.arbeidsforholdId)}>
              <Normaltekst>
                Vis detaljer <HoyreChevron />
              </Normaltekst>
            </Lenke>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Arbeidsforhold;
