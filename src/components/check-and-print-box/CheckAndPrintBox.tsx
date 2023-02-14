import React from "react";
import { CheckDateAndPrint } from "../check-date-and-print/CheckDateAndPrint";
import { CheckAndPrint } from "../check-and-print/CheckAndPrint";
import { BodyShort, Heading } from "@navikt/ds-react";

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
      <dt>
        <Heading as="p" size={"xsmall"}>
          {props.title}
        </Heading>
      </dt>
      <dd>
        <BodyShort>
          {props.date ? (
            <CheckDateAndPrint data={props.data} format={props.format} />
          ) : (
            <CheckAndPrint data={props.data} format={props.format} />
          )}
        </BodyShort>
        {props.children}
      </dd>
    </div>
  ) : null;
};
