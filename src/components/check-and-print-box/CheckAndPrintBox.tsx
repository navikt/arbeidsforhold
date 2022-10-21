import React from "react";
import { Element, Normaltekst } from "nav-frontend-typografi";
import { CheckDateAndPrint } from "../check-date-and-print/CheckDateAndPrint";
import { CheckAndPrint } from "../check-and-print/CheckAndPrint";

interface Props {
  title: string;
  data?: string | number;
  children?: string | JSX.Element | JSX.Element[];
  format?: string;
  date?: boolean;
}

export const CheckAndPrintBox = (props: Props) => {
  return props.data ? (
    <div className="af-detaljert__boks">
      <Element>{props.title}</Element>
      <Normaltekst>
        {props.date ? (
          <CheckDateAndPrint data={props.data} format={props.format} />
        ) : (
          <CheckAndPrint data={props.data} format={props.format} />
        )}
      </Normaltekst>
      {props.children}
    </div>
  ) : null;
};
