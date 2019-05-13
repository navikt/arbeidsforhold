import React from "react";
import { Arbeidsforhold } from "./types/arbeidsforhold";
import { AppProps } from "./index";
import { Normaltekst, Element } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";

interface Props {
  arbeidsforhold: Arbeidsforhold[];
}

type MergedProps = AppProps & Props;
const Arbeidsforhold = (props: MergedProps) => {
  const { arbeidsforhold, classNameContainer } = props;
  console.log(arbeidsforhold);

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
        <div className="oversikt__rad" key={foretak.navArbeidsforholdId}>
          <div className="oversikt__kolonne oversikt__tittel">
            <Normaltekst>
              {foretak.arbeidsgiver.organisasjonsnummer}
            </Normaltekst>
          </div>
          <div className="oversikt__kolonne">
            <Normaltekst>{foretak.ansettelsesperiode.periode.fom}</Normaltekst>
          </div>
          <div className="oversikt__kolonne">
            <Normaltekst>{foretak.ansettelsesperiode.periode.tom}</Normaltekst>
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
