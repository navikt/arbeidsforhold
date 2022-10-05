import React from "react";
import { AFPeriode } from "../../types/arbeidsforhold";
import NoData from "../no-data/NoData";
import CheckDateAndPrint from "../check-date-and-print/CheckDateAndPrint";
import { Text } from "@react-pdf/renderer";

interface Props {
  data?: AFPeriode;
  twoLines?: boolean;
  format?: string;
  maskineltAvsluttet?: string | null;
  isPdf?: boolean;
}

const CheckPeriodAndPrint = (props: Props) =>
  props.data ? (
    <span>
      <CheckDateAndPrint
        data={props.data.periodeFra}
        dateFormat={props.format}
        isPdf={props.isPdf}
      />
      {props.isPdf ? <Text>{` - `}</Text> : <>{` - `}</>}
      {props.twoLines && <br />}
      <CheckDateAndPrint
        data={props.data.periodeTil}
        dateFormat={props.format}
        maskineltAvsluttet={props.maskineltAvsluttet}
        isPdf={props.isPdf}
      />
    </span>
  ) : (
    <NoData isPdf={props.isPdf} />
  );

export default CheckPeriodAndPrint;
