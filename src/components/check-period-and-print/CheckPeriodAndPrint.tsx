import React from "react";
import { AFPeriode } from "../../types/arbeidsforhold";
import CheckAndPrint from "../check-and-print/CheckAndPrint";
import NoData from "../no-data/NoData";

interface Props {
  data?: AFPeriode;
  twoLines?: boolean;
}

const CheckPeriodAndPrint = (props: Props) =>
  props.data ? (
    <>
      <CheckAndPrint data={props.data.periodeFra} />
      {` - `}
      {props.twoLines && <br />}
      <CheckAndPrint data={props.data.periodeTil} />
    </>
  ) : (
    <NoData />
  );

export default CheckPeriodAndPrint;
