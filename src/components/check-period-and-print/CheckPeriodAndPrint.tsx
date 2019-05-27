import React from "react";
import { AFPeriode } from "../../types/arbeidsforhold";
import NoData from "../no-data/NoData";
import CheckDateAndPrint from "../check-date-and-print/CheckDateAndPrint";

interface Props {
  data?: AFPeriode;
  twoLines?: boolean;
}

const CheckPeriodAndPrint = (props: Props) =>
  props.data ? (
    <>
      <CheckDateAndPrint data={props.data.periodeFra} />
      {` - `}
      {props.twoLines && <br />}
      <CheckDateAndPrint data={props.data.periodeTil} />
    </>
  ) : (
    <NoData />
  );

export default CheckPeriodAndPrint;
