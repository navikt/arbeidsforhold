import React from "react";
import { Normaltekst, Undertittel, Element } from "nav-frontend-typografi";
import { AFDetaljertData, AFDetaljertProps } from "./index";
import { EtikettSuksess } from "nav-frontend-etiketter";

const Arbeidsforhold = (props: AFDetaljertProps & AFDetaljertData) => {
  const { arbeidsforhold, classNameContainer } = props;
  const sisteArbeidsavtale = arbeidsforhold.arbeidsavtaler[0];
  return (
    <div
      className={`arbeidsforhold__container ${
        classNameContainer ? classNameContainer : ""
      }`}
    >
      <div className="arbeidsforhold__header">
        <div className="arbeidsforhold__kolonne">
          <div className="arbeidsforhold__arbeidsgiver">
            <Undertittel>
              {arbeidsforhold.arbeidsgiver.organisasjonsnavn}
            </Undertittel>
          </div>
          <Normaltekst>
            {arbeidsforhold.ansettelsesperiode.periode.fom}
          </Normaltekst>
        </div>
        <div className="arbeidsforhold__kolonne arbeidsforhold__status">
          <EtikettSuksess>Nåværende jobb</EtikettSuksess>
        </div>
      </div>
      <hr />
      <div className="arbeidsforhold__innhold">
        <div className="arbeidsforhold__boks">
          <Element>Organisasjonsnumer</Element>
          <Normaltekst>
            {arbeidsforhold.arbeidsgiver.organisasjonsnummer}
          </Normaltekst>
        </div>
        <div className="arbeidsforhold__boks">
          <Element>Yrke</Element>
          <Normaltekst>{sisteArbeidsavtale.yrke}</Normaltekst>
        </div>
        <div className="arbeidsforhold__boks">
          <Element>Stilling</Element>
          <Normaltekst>{sisteArbeidsavtale.stillingsprosent}</Normaltekst>
        </div>
        <div className="arbeidsforhold__boks">
          <Element>Type arbeidsforhold</Element>
          <Normaltekst>{arbeidsforhold.type}</Normaltekst>
        </div>
      </div>
    </div>
  );
};

export default Arbeidsforhold;
