import React from "react";
import { AFArbeidsgiver } from "../../types/arbeidsforhold";
import CheckAndPrint from "../check-and-print/CheckAndPrint";

import { fnr } from "../../utils/fnr";

interface Props {
  arbeidsgiver: AFArbeidsgiver;
  overskrift?: boolean;
}

const ArbeidsgiverTittel = (props: Props) => {
  switch (props.arbeidsgiver.type) {
    case "Person":
      return (
        <CheckAndPrint
          data={fnr(props.arbeidsgiver.fnr)}
          font={props.overskrift ? "typo-undertittel" : "typo-element"}
        />
      );
    case "Organisasjon":
      return (
        <CheckAndPrint
          data={props.arbeidsgiver.orgnavn}
          font={props.overskrift ? "typo-undertittel" : "typo-element"}
        />
      );
    default:
      return null;
  }
};

export default ArbeidsgiverTittel;
