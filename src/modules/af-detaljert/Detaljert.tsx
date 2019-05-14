import React from "react";
import { Normaltekst, Undertittel, Element } from "nav-frontend-typografi";
import { AFDetaljertData, AFDetaljertProps } from "./index";
import { EtikettSuksess } from "nav-frontend-etiketter";

const Arbeidsforhold = (props: AFDetaljertProps & AFDetaljertData) => {
  const { arbeidsforhold, classNameContainer } = props;
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
      <div className="arbeidsforhold__rad">
        <div className="arbeidsforhold__kolonne ">
          <Element>Organisasjonsnumer</Element>
          <Normaltekst>
            {arbeidsforhold.arbeidsgiver.organisasjonsnummer}
          </Normaltekst>
        </div>
      </div>
    </div>
  );
};

export default Arbeidsforhold;
