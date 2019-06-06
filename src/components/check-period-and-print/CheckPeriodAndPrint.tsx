import React from "react";
import { AFPeriode } from "../../types/arbeidsforhold";
import NoData from "../no-data/NoData";
import CheckDateAndPrint from "../check-date-and-print/CheckDateAndPrint";

interface Props {
  data?: AFPeriode;
  twoLines?: boolean;
  format?: string;
}

const CheckPeriodAndPrint = (props: Props) =>
  props.data ? (
    <span>
      <CheckDateAndPrint
        data={props.data.periodeFra}
        dateFormat={props.format}
      />
      {` - `}
      {props.twoLines && <br />}
      <CheckDateAndPrint
        data={props.data.periodeTil}
        dateFormat={props.format}
      />
    </span>
  ) : (
    <NoData />
  );

export default CheckPeriodAndPrint;
