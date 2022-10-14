import React from "react";
import { AFPeriode } from "../../types/arbeidsforhold";
import NoData from "../no-data/NoData";
import CheckDateAndPrint from "../check-date-and-print/CheckDateAndPrint";
import CheckIsPdf from "../check-pdf/CheckIsPdf";

interface Props {
  data?: AFPeriode;
  twoLines?: boolean;
  format?: string;
  maskineltAvsluttet?: string | null;
}

const CheckPeriodAndPrint = (props: Props) =>
  props.data ? (
    <span>
      <CheckDateAndPrint
        data={props.data.periodeFra}
        dateFormat={props.format}
      />
      <CheckIsPdf>{` - `}</CheckIsPdf>
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

export default CheckPeriodAndPrint;
