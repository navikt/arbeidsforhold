import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { AFDetaljertData, AFDetaljertProps } from "./index";

const Arbeidsforhold = (props: AFDetaljertProps & AFDetaljertData) => {
  const { arbeidsforhold, classNameContainer } = props;
  return (
    <div
      className={`arbeidsforhold__container ${
        classNameContainer ? classNameContainer : ""
      }`}
    >
      <Normaltekst>{arbeidsforhold.arbeidsgiver.organisasjonsnavn}</Normaltekst>
    </div>
  );
};

export default Arbeidsforhold;
