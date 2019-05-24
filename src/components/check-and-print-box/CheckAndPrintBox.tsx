import React from "react";
import { Element, Normaltekst } from "nav-frontend-typografi";
import CheckDateAndPrint from "../check-date-and-print/CheckDateAndPrint";
import CheckAndPrint from "../check-and-print/CheckAndPrint";

interface Props {
  title: string;
  data?: string | number;
  date?: boolean;
}

const CheckAndPrintBox = (props: Props) =>
  props.data ? (
    <div className="af-detaljert__boks">
      <Element>{props.title}</Element>
      <Normaltekst>
        {props.date ? (
          <CheckDateAndPrint data={props.data} />
        ) : (
          <CheckAndPrint data={props.data} />
        )}
      </Normaltekst>
    </div>
  ) : null;

export default CheckAndPrintBox;
