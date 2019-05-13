import React from "react";
import { Arbeidsforhold } from "./types/arbeidsforhold";
import { AppProps } from "./index";

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
      {arbeidsforhold.map(foretak => (
        <div key={foretak.navArbeidsforholdId}>
          {foretak.arbeidsgiver.organisasjonsnummer}
        </div>
      ))}
    </div>
  );
};

export default Arbeidsforhold;
