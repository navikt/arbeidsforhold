import React from "react";
import { AFPeriode } from "../../types/arbeidsforhold";
import { NoData } from "../no-data/NoData";
import { CheckDateAndPrint } from "../check-date-and-print/CheckDateAndPrint";
import { TextIfPdf } from "../text-if-pdf/TextIfPdf";

interface Props {
  data?: AFPeriode;
  twoLines?: boolean;
  format?: string;
  maskineltAvsluttet?: string | null;
}

export const CheckPeriodAndPrint = (props: Props) => {
  return props.data ? (
    <span>
      <CheckDateAndPrint
        data={props.data.periodeFra}
        dateFormat={props.format}
      />
      <TextIfPdf>{` - `}</TextIfPdf>
      {props.twoLines && <br />}
      <CheckDateAndPrint
        data={props.data.periodeTil}
        dateFormat={props.format}
        maskineltAvsluttet={props.maskineltAvsluttet}
      />
    </span>
  ) : (
    <NoData />
  );
};
