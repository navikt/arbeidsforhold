import React from "react";
import { AFUtvidet } from "../../types/arbeidsforhold";
import { Normaltekst } from "nav-frontend-typografi";

interface Props {
  arbeidsforhold: AFUtvidet;
  classNameContainer?: string;
}

const Arbeidsforhold = (props: Props) => {
  const { arbeidsforhold, classNameContainer } = props;
  console.log(arbeidsforhold);

  return (
    <div
      className={`arbeidsforhold__container ${
        classNameContainer ? classNameContainer : ""
      }`}
    >
      <Normaltekst>ffafa</Normaltekst>
    </div>
  );
};

export default Arbeidsforhold;
