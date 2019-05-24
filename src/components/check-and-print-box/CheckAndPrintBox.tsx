import React from "react";
import { Element, Normaltekst } from "nav-frontend-typografi";

interface Props {
  title: string;
  data?: string | number;
}

const CheckAndPrintBox = (props: Props) =>
  props.data ? (
    <div className="af-detaljert__boks">
      <Element>{props.title}</Element>
      <Normaltekst>{props.data}</Normaltekst>
    </div>
  ) : null;

export default CheckAndPrintBox;
