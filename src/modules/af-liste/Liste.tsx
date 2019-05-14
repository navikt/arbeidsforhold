import React from "react";
import { AFSimpel } from "../../types/arbeidsforhold";
import { Normaltekst, Element } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";

interface Props {
  arbeidsforhold: AFSimpel[];
  classNameContainer?: string;
}

const Arbeidsforhold = (props: Props) => {
  const { arbeidsforhold, classNameContainer } = props;
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
            <Lenke href="#test">Vis detaljer</Lenke>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Arbeidsforhold;
